import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AuthProvider } from '@/context/authContext';
import 'react-native-reanimated'

const queryClient = new QueryClient();

export default function CustomLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider>
          <Slot />
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
