import { useCallback, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// context
import { useAuth } from "~/context/AuthContext";

// services
import { fetchActivitiesByIdUser, targetRealisasi } from "~/services/trx/activity";

// components
import Topbar from "~/components/TopBar";
import { ScrollView, View, StyleSheet, useWindowDimensions } from 'react-native';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Text } from '~/components/ui/text';
import { Dropdown } from "react-native-element-dropdown";
import { useFocusEffect } from "expo-router";

interface PipelineRealisasiProps {
  mst_sts_approval: {
    id_sts_approval: number
  };
  persentase: string;
  realisasi: string;
  segment: string;
  target: string;
  tahun: number;
  bulan: number;
  application: string;
  product: string;
}

export default function PipelineRealisasiScreen() {
  const { logout } = useAuth();

  const [year, setYear] = useState(new Date().getFullYear());
  const [isFocusYear, setIsFocusYear] = useState(false);
  const [data, setData] = useState<PipelineRealisasiProps[]>([]);

  const dataYear = [
    { label: "2020", value: 2020 },
    { label: "2021", value: 2021 },
    { label: "2022", value: 2022 },
    { label: "2023", value: 2023 },
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
    { label: "2026", value: 2026 },
    { label: "2027", value: 2027 },
    { label: "2028", value: 2028 },
    { label: "2029", value: 2029 },
    { label: "2030", value: 2030 },
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await targetRealisasi(year);

  //     console.log(response.data.data);

  //     if (response.status === 200) {
  //       setData(response.data.data);
  //     } else {
  //       logout();
  //     }
  //   }

  //   fetchData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const response = await targetRealisasi(year);

        console.log(response.data.data);

        if (response.status === 200) {
          setData(response.data.data);
        } else {
          logout();
        }
      }

      fetchData();
    }, [year])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      {/* Header */}
      <Topbar titleBar="Pipiline VS Realisasi" />
      {/* header */}

      <View style={styles.container}>
        <View style={styles.yearContainer}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 13,
            }}
          >
            Tahun
          </Text>
          <Dropdown
            style={[
              styles.dropdownYear,
              isFocusYear && { borderColor: "blue" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={dataYear}
            labelField="label"
            valueField="value"
            placeholder={!isFocusYear ? "Pilih Tahun" : "..."}
            value={dataYear.find(item => item.value === year)}
            onFocus={() => setIsFocusYear(true)}
            onBlur={() => setIsFocusYear(false)}
            onChange={(item) => {
              setYear(item.value);
              setIsFocusYear(false);
            }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Table aria-labelledby='invoice-table'>
            <TableHeader>
              <TableRow style={{ borderBottomWidth: 3, borderColor: "#F48120" }}>
                <TableHead style={{ width: wp("24%") }}>
                  <Text style={styles.tableHeadText}>Segment</Text>
                </TableHead>
                <TableHead style={{ width: wp("44%") }}>
                  <Text style={styles.tableHeadText}>Target/Realisasi (Rb)</Text>
                </TableHead>
                <TableHead>
                  <Text style={styles.tableHeadText}>Pencapaian</Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? data.map((item, index) => (
                <TableRow key={index} style={{ borderBottomWidth: .5, borderColor: "#707070" }}>
                  <TableCell style={{ width: wp("25%") }}>
                    <Text style={styles.textContent}>{item.application} - {item.product} {item.segment} {item.tahun} {item.bulan}</Text>
                  </TableCell>
                  <TableCell style={{ width: wp("50%") }}>
                    {/* ubah format menjadi ribuan */}
                    <Text style={styles.textContent}>Target: Rp {item.target ? item.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0}</Text>
                    <Text style={styles.textContent}>Realisasi: Rp {item.realisasi ? item.realisasi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0}</Text>
                  </TableCell>
                  <TableCell style={{ width: "auto", alignItems: "flex-end" }}>
                    <Text style={styles.textContent}>{item.persentase} %</Text>
                  </TableCell>
                </TableRow>
              )) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20
                  }}
                >
                  <Text>Tidak ada data</Text>
                </View>
              )}
            </TableBody>
          </Table>
        </ScrollView>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: hp("1%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tableHeadText: {
    color: "#707070",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  tableColumn: {
    paddingVertical: 10,
  },
  tableColumnText: {
    color: "#707070",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  textContent: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },

  yearContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  dropdownYear: {
    backgroundColor: "#F6F5F5",
    height: 30,
    width: 100,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  selectedTextStyle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  itemTextStyle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
