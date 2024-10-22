import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// components
import Topbar from "~/components/TopBar";
import * as React from 'react';
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

const INVOICES = [
  {
    segment: 'Retail',
    target: 'Rp. 100.000.000',
    realisasi: 'Rp. 10.000.000',
    pencapaian: '10%',
  },
];

export default function PipelineRealisasiScreen() {
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
                <TableHead style={{ width: wp("45%") }}>
                  <Text style={styles.tableHeadText}>Target/Realisasi (Rb)</Text>
                </TableHead>
                <TableHead>
                  <Text style={styles.tableHeadText}>Pencapian</Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((invoice, index) => (
                <TableRow key={index} style={{ borderBottomWidth: .5, borderColor: "#707070" }}>
                  <TableCell style={{ width: wp("24%") }}>
                    <Text>{invoice.segment}</Text>
                  </TableCell>
                  <TableCell style={{ width: wp("55%") }}>
                    <Text>Target: {invoice.target}</Text>
                    <Text>Realisasi: {invoice.realisasi}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{invoice.pencapaian}</Text>
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
