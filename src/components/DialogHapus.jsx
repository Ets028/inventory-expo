import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';

const DeleteDialog = ({ visible, onDismiss, onDelete }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Konfirmasi Hapus</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Apakah Anda yakin ingin menghapus ini?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Batal</Button>
          <Button onPress={onDelete}>Hapus</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteDialog;
