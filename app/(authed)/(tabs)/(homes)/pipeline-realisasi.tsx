import { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// context
import { useAuth } from "~/context/AuthContext";

// services
import { fetchActivitiesByIdUser } from "~/services/trx/activity";

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

interface PipelineRealisasiProps {
  mst_sts_approval: {
    id_sts_approval: number
  };
  pencapaian: string;
  realisasi: string;
  segment: string;
  target: string;
}

export default function PipelineRealisasiScreen() {
  const { logout, user } = useAuth();

  const [data, setData] = useState<PipelineRealisasiProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchActivitiesByIdUser(user.id_user);

      if (response.status === 200) {
        // show data and filter id_sts_approval from mst_sts_approval != 1
        setData(response.data.data.filter((item: PipelineRealisasiProps) => item.mst_sts_approval.id_sts_approval !== 1));
      } else {
        logout();
      }
    }

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      {/* Header */}
      <Topbar titleBar="Pipiline VS Realisasi" />
      {/* header */}

      <View style={styles.container}>
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
              {data.map((item, index) => (
                <TableRow key={index} style={{ borderBottomWidth: .5, borderColor: "#707070" }}>
                  <TableCell style={{ width: wp("24%") }}>
                    <Text>{item.segment}</Text>
                  </TableCell>
                  <TableCell style={{ width: wp("54%") }}>
                    <Text>Target: Rp {item.target ? item.target.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0}</Text>
                    <Text>Realisasi: Rp {item.realisasi ? item.realisasi.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.pencapaian}</Text>
                  </TableCell>
                </TableRow>
              ))}
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
  }
});
