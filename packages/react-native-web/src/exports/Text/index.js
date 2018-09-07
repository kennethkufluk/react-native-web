/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* global Node */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import { bool } from 'prop-types';
import { Component } from 'react';
import createElement from '../createElement';
import StyleSheet from '../StyleSheet';
import TextPropTypes from './TextPropTypes';

type State = {|
  needsEllipsisMeasure: boolean,
  renderedText: any
|};

class Text extends Component<*, State> {
  _nodeRef: any;
  _ellipsisWidth: number;

  static displayName = 'Text';

  static propTypes = TextPropTypes;

  static childContextTypes = {
    isInAParentText: bool
  };

  static contextTypes = {
    isInAParentText: bool
  };

  static defaultProps = {
    ellipsis: '…'
  };

  getChildContext() {
    return { isInAParentText: true };
  }

  constructor(props, state) {
    super(props, state);
    const { children, numberOfLines } = this.props;
    const { isInAParentText } = this.context;
    this.state = {
      needsEllipsisMeasure: !!numberOfLines && !isInAParentText,
      renderedText: children
    };
  }

  getWidthBySelection(node) {
    const range = document.createRange();
    range.selectNodeContents(node);
    return range.getBoundingClientRect().width;
  }

  getChildrenAsArray(children) {
    return typeof children === 'object'
      ? [...children].filter(x => x !== undefined && x !== null)
      : [children];
  }

  getClampedChildren = (children, renderedNodes) => {
    const { numberOfLines } = this.props;
    const fontHeight = parseInt(window.getComputedStyle(this._nodeRef).fontSize, window);

    let isOverflow = false;
    let lineCounter = 0;
    let previousLineHeight = 0;
    const range = document.createRange();
    range.setStart(renderedNodes[0], 0);
    const lastVisibleLine = { start: { node: renderedNodes[0], char: 0 }, end: {} };
    const clampedChildren = children.map((childNode, index) => {
      if (isOverflow) return null;
      const renderedChild = renderedNodes[index];
      if (renderedChild.nodeType === Node.TEXT_NODE) {
        for (let char = 0; char < renderedChild.nodeValue.length; char++) {
          range.setEnd(renderedChild, char);
          const rangeHeight = range.getBoundingClientRect().height;
          if (rangeHeight - previousLineHeight > fontHeight) {
            lineCounter++;
            if (lineCounter > numberOfLines) {
              lastVisibleLine.end = { node: renderedChild, char: char - 1 };
              isOverflow = true;
              return childNode.substring(0, char - 1);
            }
            lastVisibleLine.start = { node: renderedChild, char: char };
          }
          previousLineHeight = rangeHeight;
        }
      } else {
        // other nodes are treated as atomic units
        range.setEndAfter(renderedChild);
        const rangeHeight = range.getBoundingClientRect().height;
        if (rangeHeight - previousLineHeight > fontHeight) {
          lineCounter++;
          if (lineCounter > numberOfLines) {
            isOverflow = true;
            lastVisibleLine.end = {
              node: renderedChild,
              char: 0
            };
            return childNode;
          }
          lastVisibleLine.start = { node: renderedChild, char: 0 };
        }
        previousLineHeight = rangeHeight;
      }
      return childNode;
    });
    return { clampedChildren, lastVisibleLine, isOverflow };
  };

  makeRoomForEllipsis = (children, renderedNodes, lastVisibleLine) => {
    if (!lastVisibleLine.end.node) return children; // If no end is set, we didn't clamp

    const range = document.createRange();
    range.setStart(lastVisibleLine.start.node, lastVisibleLine.start.char);
    range.setEndAfter(lastVisibleLine.end.node);
    const fullLineWidth = range.getBoundingClientRect().width;
    const neededLineWidth = fullLineWidth - this._ellipsisWidth;
    let fitsWidth = fullLineWidth <= neededLineWidth;
    return children
      .reverse()
      .map((childNode, index) => {
        if (childNode === null) return null;
        if (fitsWidth) return childNode;
        const renderedChild = renderedNodes[renderedNodes.length - 2 - index]; // remove an extra 1 for the ellipsis character
        if (renderedChild.nodeType === Node.TEXT_NODE) {
          /* text node */
          for (let char = renderedChild.nodeValue.length; char > 0; char--) {
            range.setEnd(renderedChild, char);
            const lineWidth = range.getBoundingClientRect().width;
            if (lineWidth <= neededLineWidth) {
              fitsWidth = true;
              return childNode.substring(0, char - 2); // remove two characters here because, uh, TODO:
            }
          }
        } else {
          // other nodes are treated as atomic units
          range.setEndBefore(renderedChild);
          const lineWidth = range.getBoundingClientRect().width;
          if (lineWidth <= neededLineWidth) {
            fitsWidth = true;
          }
        }
        return null;
      })
      .reverse();
  };

  componentDidMount() {
    const { children, ellipsis } = this.props;
    const { needsEllipsisMeasure } = this.state;

    if (needsEllipsisMeasure) {
      // measure the width of the ellipsis element we added
      const ellipsisNode = this._nodeRef.childNodes[this._nodeRef.childNodes.length - 1];
      this._ellipsisWidth = this.getWidthBySelection(ellipsisNode);
      this.setState({ needsEllipsisMeasure: false });
      // then truncate to the number of lines
      const childrenArr = this.getChildrenAsArray(children);
      const { clampedChildren, lastVisibleLine, isOverflow } = this.getClampedChildren(
        childrenArr,
        this._nodeRef.childNodes
      );

      if (isOverflow) {
        const clampedChildrenWithRoomForEllipsis = this.makeRoomForEllipsis(
          clampedChildren,
          this._nodeRef.childNodes,
          lastVisibleLine
        );
        // add an ellipsis
        this.setState({ renderedText: [...clampedChildrenWithRoomForEllipsis, ellipsis] });
      }
    }
  }

  render() {
    const {
      dir,
      ellipsis,
      onPress,
      selectable,
      style,
      /* eslint-disable */
      adjustsFontSizeToFit,
      allowFontScaling,
      ellipsizeMode,
      lineBreakMode,
      minimumFontScale,
      numberOfLines,
      onLayout,
      onLongPress,
      pressRetentionOffset,
      selectionColor,
      suppressHighlighting,
      textBreakStrategy,
      tvParallaxProperties,
      /* eslint-enable */
      ...otherProps
    } = this.props;
    const { needsEllipsisMeasure } = this.state;

    const { isInAParentText } = this.context;

    if (onPress) {
      otherProps.accessible = true;
      otherProps.onClick = this._createPressHandler(onPress);
      otherProps.onKeyDown = this._createEnterHandler(onPress);
    }

    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';
    otherProps.style = [
      styles.initial,
      this.context.isInAParentText === true && styles.isInAParentText,
      style,
      selectable === false && styles.notSelectable,
      onPress && styles.pressable,
      needsEllipsisMeasure && styles.hidden
    ];

    otherProps.children = this.state.renderedText;
    if (needsEllipsisMeasure) {
      otherProps.children = [...otherProps.children, ellipsis];
    }

    otherProps.ref = this._setNodeRef;

    const component = isInAParentText ? 'span' : 'div';

    return createElement(component, otherProps);
  }

  _createEnterHandler(fn) {
    return e => {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  }

  _createPressHandler(fn) {
    return e => {
      e.stopPropagation();
      fn && fn(e);
    };
  }

  _setNodeRef = ref => {
    this._nodeRef = ref;
  };
}

const styles = StyleSheet.create({
  initial: {
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'inline',
    fontFamily: 'System',
    fontSize: 14,
    fontStyle: 'inherit',
    fontVariant: ['inherit'],
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  hidden: {
    opacity: 0
  },
  isInAParentText: {
    // inherit parent font styles
    fontFamily: 'inherit',
    fontSize: 'inherit',
    whiteSpace: 'inherit'
  },
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  }
});

export default applyLayout(applyNativeMethods(Text));
