/**
 * @flow
 */

import React from 'react';
import { Text, View } from 'react-native';

const TextNumberOfLinesExample = () => (
  <View style={{ maxWidth: 320 }}>
    <Text numberOfLines={1}>
      Maximum of one line, no matter how much I write here. If I keep writing, it
      {"'"}
      ll just truncate after one line.
    </Text>
    <Text numberOfLines={1} style={{ marginTop: 20 }}>
      查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情
    </Text>
    <Text numberOfLines={1} style={{ marginTop: 20 }}>
      Maximum of one line, with emoji
      😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛😛
    </Text>
    <Text numberOfLines={1} style={{ marginTop: 20 }}>
      Maximum of one line, complex emoji
      👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧👩‍👩‍👧‍👧
    </Text>
    <Text numberOfLines={1} style={{ marginTop: 20 }}>
      Maximum of one line, img emoji
      <img
        alt=""
        draggable="false"
        src="https://abs-0.twimg.com/emoji/v2/svg/1f618.svg"
        style={{ width: '1.7em' }}
      />
      <img
        alt=""
        draggable="false"
        src="https://abs-0.twimg.com/emoji/v2/svg/1f618.svg"
        style={{ width: '1.7em' }}
      />
      <img
        alt=""
        draggable="false"
        src="https://abs-0.twimg.com/emoji/v2/svg/1f618.svg"
        style={{ width: '1.7em' }}
      />
      <img
        alt=""
        draggable="false"
        src="https://abs-0.twimg.com/emoji/v2/svg/1f618.svg"
        style={{ width: '1.7em' }}
      />
      <img
        alt=""
        draggable="false"
        src="https://abs-0.twimg.com/emoji/v2/svg/1f618.svg"
        style={{ width: '1.7em' }}
      />
      <img
        alt=""
        draggable="false"
        src="https://abs-0.twimg.com/emoji/v2/svg/1f618.svg"
        style={{ width: '1.7em' }}
      />
    </Text>
    <Text numberOfLines={1} style={{ marginTop: 20 }}>
      {/* Text elements are atomic but should be truncated. sub-Texts shouldn't support numberOfLines */}
      ⚠️Maximum of one line, with{' '}
      <Text style={{ fontWeight: 'bold' }}>
        nested Text elements at the wrap and truncation points
      </Text>
    </Text>
    <Text dir="rtl" numberOfLines={1} style={{ marginTop: 20 }}>
      شاهِد ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد
      ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد ما يحدث
      في العالم الآن شاهِد ما يحدث في العالم الآن
    </Text>
    <Text numberOfLines={2} style={{ marginTop: 20 }}>
      Maximum of two lines, no matter how much I write here. If I keep writing, it
      {"'"}
      ll just truncate after two lines. It
      {"'"}
      ll just truncate after two lines. It
      {"'"}
      ll just truncate after two lines. It
      {"'"}
      ll just truncate after two lines.
    </Text>
    <Text dir="rtl" numberOfLines={2} style={{ marginTop: 20 }}>
      شاهِد ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد
      ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد ما يحدث
      في العالم الآن شاهِد ما يحدث في العالم الآن
    </Text>
    <Text numberOfLines={2} style={{ marginTop: 20 }}>
      查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情
    </Text>
    <Text numberOfLines={3} style={{ marginTop: 20 }}>
      Maximum of three lines, no matter how much I write here. If I keep writing, it
      {"'"}
      ll just truncate after three lines. It
      {"'"}
      ll just truncate after three lines. It
      {"'"}
      ll just truncate after three lines. It
      {"'"}
      ll just truncate after three lines.
    </Text>
    <Text dir="rtl" numberOfLines={3} style={{ marginTop: 20 }}>
      شاهِد ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد
      ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد ما يحدث في العالم الآن شاهِد ما يحدث
      في العالم الآن شاهِد ما يحدث في العالم الآن
    </Text>
    <Text numberOfLines={3} style={{ marginTop: 20 }}>
      查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情查看世界上正在发生的事情
    </Text>
    <Text numberOfLines={4} style={{ marginTop: 20 }}>
      Maximum of four lines but only short content.
    </Text>
    <Text ellipsis="🍌" numberOfLines={1} style={{ marginTop: 20 }}>
      Custom ellipsis is an emoji of a banana for no good reason
    </Text>
    <Text style={{ marginTop: 20 }}>
      No maximum lines specified, no matter how much I write here. If I keep writing, it
      {"'"}
      ll just keep going and going.
    </Text>
  </View>
);

export default TextNumberOfLinesExample;
