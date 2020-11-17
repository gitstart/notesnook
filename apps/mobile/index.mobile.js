import React from 'react';
import {View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ContextMenu from './src/components/ContextMenu';
import {DialogManager} from './src/components/DialogManager';
import {DummyText} from './src/components/DummyText';
import {Toast} from './src/components/Toast';
import {NavigationStack} from './src/navigation/Drawer';
import {NavigatorStack} from './src/navigation/NavigatorStack';
import {useTracked} from './src/provider';
import {eSendEvent} from './src/services/EventManager';
import {editing} from './src/utils';
import {eCloseSideMenu, eOnLoadNote, eOpenSideMenu} from './src/utils/Events';
import {tabBarRef} from './src/utils/Refs';
import {EditorWrapper} from './src/views/Editor/EditorWrapper';
import {getIntent, getNote, post} from './src/views/Editor/Functions';
export const Initialize = () => {
  const [state] = useTracked();
  const {colors} = state;

  return (
    <>
      <View
        testID={'mobile_main_view'}
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          backgroundColor: colors.bg,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.bg,
          }}>
          <NavigationStack component={MobileStack} />
        </View>
      </View>
      <Toast />
      <ContextMenu />
      <DummyText />
      <DialogManager colors={colors} />
    </>
  );
};

const onChangeTab = async (obj) => {
  if (obj.i === 1) {
    eSendEvent(eCloseSideMenu);
    if (getIntent()) return;
    if (!editing.currentlyEditing || !getNote()) {
      eSendEvent(eOnLoadNote, {type: 'new'});
    }
  } else {
    if (obj.from === 1) {
      post('blur');
      eSendEvent(eOpenSideMenu);
    }
  }
};

const MobileStack = React.memo(
  () => {
    return (
      <ScrollableTabView
        ref={tabBarRef}
        prerenderingSiblingsNumber={Infinity}
        onChangeTab={onChangeTab}
        renderTabBar={() => <></>}>
        <NavigatorStack />
        <EditorWrapper />
      </ScrollableTabView>
    );
  },
  () => true,
);
