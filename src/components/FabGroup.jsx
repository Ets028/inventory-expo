import { Theme } from '@/constants/Theme';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal} from 'react-native-paper';

const FabGroup = ({ actions }) => {
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
      <Portal>
        <FAB.Group
          open={open}
          style={styles.fab}
          icon={open ? 'close' : 'plus'}
          actions={actions}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // Aksi jika FAB utama ditekan saat sudah terbuka
            }
          }}
        />
      </Portal>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 5,
    left: 10,
    bottom: 50,
  },
});

export default FabGroup;
