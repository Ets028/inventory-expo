import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';
import { FAB } from 'react-native-paper';
import { Theme } from '@/constants/Theme';

const DownloadExcel = ({ data, fileName }) => {

    const handleDownload = async () => {
        try {
            console.log('filename:', fileName);
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet(data);

          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
          const uri = FileSystem.documentDirectory + `${fileName}.xlsx`;
          await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
    
          // Bagikan atau unduh file
          await Sharing.shareAsync(uri);
        } catch (error) {
          console.error('Error downloading Excel file:', error);
        }
      };

  return (
    <FAB style={styles.fab} color={Theme.colors.primary} icon="download" onPress={handleDownload}/>
  );
};

export default DownloadExcel;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 9,
    bottom: 80,
  },
});
