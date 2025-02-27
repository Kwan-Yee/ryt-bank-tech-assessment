import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  YStack,
  XStack,
  Card,
  Separator,
  Circle,
  Button,
  Spinner,
} from "tamagui";
import {
  MapPin,
  Calendar,
  Tag,
  CreditCard,
  Users,
  FileText,
} from "@tamagui/lucide-icons";
import { ScrollView } from "react-native";
import { useTransactionStore } from "@/store";
import { useEffect } from "react";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams();
  const extractId = typeof id === "string" ? id : id[0];
  const {
    fetchTransactionItem,
    isFetchingTransactionItem,
    selectedTransactionItem,
  } = useTransactionStore();
  useEffect(() => {
    fetchTransactionItem({ id: extractId });
  }, []);

  const DetailRow = ({ icon, label, value }) => (
    <XStack space="$4" py="$3">
      <XStack w={24} jc="center" ai="center">
        {icon}
      </XStack>
      <XStack f={1} jc="space-between">
        <Text color="$color" o={0.7}>
          {label}
        </Text>
        <Text fontWeight="500">{value}</Text>
      </XStack>
    </XStack>
  );

  return (
    <ScrollView>
      {isFetchingTransactionItem ? (
        <YStack f={1} jc="center" ai="center">
          <Spinner size="large" color="$blue10" />
          <Text mt="$2" color="$blue10">
            Loading...
          </Text>
        </YStack>
      ) : (
        <YStack f={1} p="$4" space="$4">
          <Card p="$5" bg="$background">
            <YStack ai="center" space="$4" mb="$4">
              <Circle
                size={80}
                bg={
                  selectedTransactionItem?.amount ?? 0 < 0 ? "$red5" : "$green5"
                }
              >
                <Text
                  fontSize={24}
                  fontWeight="bold"
                  color={
                    selectedTransactionItem?.amount ?? 0 < 0
                      ? "$red10"
                      : "$green10"
                  }
                >
                  {selectedTransactionItem?.amount ?? 0 < 0 ? "-" : "+"}$
                </Text>
              </Circle>

              <YStack ai="center">
                <Text fontSize={32} fontWeight="bold">
                  ${Math.abs(selectedTransactionItem?.amount).toFixed(2)}
                </Text>
                <Text fontSize={16} o={0.7}>
                  {selectedTransactionItem?.merchant}
                </Text>
              </YStack>
            </YStack>

            <Separator mb="$4" />

            <YStack space="$2">
              <DetailRow
                icon={<Calendar size={18} color="$blue10" />}
                label="Date"
                value={new Date(
                  selectedTransactionItem?.date ?? 41234543
                ).toLocaleDateString()}
              />

              <DetailRow
                icon={<Tag size={18} color="$orange10" />}
                label="Category"
                value={selectedTransactionItem?.category}
              />

              <DetailRow
                icon={<CreditCard size={18} color="$purple10" />}
                label="Payment Method"
                value={selectedTransactionItem?.paymentMethod}
              />
            </YStack>
          </Card>

          {selectedTransactionItem?.notes && (
            <Card p="$4" bg="$background">
              <XStack space="$3" ai="center" mb="$2">
                <FileText size={18} color="$gray10" />
                <Text fontWeight="bold">Notes</Text>
              </XStack>
              <Text>{selectedTransactionItem?.notes}</Text>
            </Card>
          )}
        </YStack>
      )}
    </ScrollView>
  );
}
