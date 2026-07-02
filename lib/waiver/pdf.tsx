import { Document, Page, View, Text, Image, StyleSheet, renderToBuffer } from '@react-pdf/renderer';
import { WAIVER_BUSINESS_NAME, WAIVER_PROPERTY_LOCATION, waiverSections } from './content';
import type { SignedWaiverRecord } from './schema';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: '#1f2937', fontFamily: 'Helvetica' },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 10, color: '#4b5563', marginBottom: 16 },
  sectionHeading: { fontSize: 11, fontWeight: 700, marginTop: 12, marginBottom: 4 },
  paragraph: { marginBottom: 4, lineHeight: 1.4 },
  detailsBox: { marginTop: 16, marginBottom: 8, padding: 10, backgroundColor: '#f3f4f6', borderRadius: 4 },
  detailsRow: { flexDirection: 'row', marginBottom: 3 },
  detailsLabel: { width: 140, fontWeight: 700 },
  detailsValue: { flex: 1 },
  signatureBlock: { marginTop: 20, borderTop: '1px solid #d1d5db', paddingTop: 12 },
  signatureImage: { width: 220, height: 80, objectFit: 'contain', marginTop: 6, marginBottom: 6 },
});

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailsRow}>
      <Text style={styles.detailsLabel}>{label}</Text>
      <Text style={styles.detailsValue}>{value}</Text>
    </View>
  );
}

export function WaiverPdfDocument({ record }: { record: SignedWaiverRecord }) {
  return (
    <Document title={`${WAIVER_BUSINESS_NAME} - Signed Liability Waiver`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{WAIVER_BUSINESS_NAME} — Liability Waiver</Text>
        <Text style={styles.subtitle}>{WAIVER_PROPERTY_LOCATION}</Text>

        <View style={styles.detailsBox}>
          <DetailRow label="Guest name" value={record.guestFullName} />
          <DetailRow label="Email" value={record.guestEmail} />
          <DetailRow label="Phone" value={record.guestPhone} />
          <DetailRow label="Home address" value={record.homeAddress} />
          <DetailRow label="Stay dates" value={`${record.arrivalDate} to ${record.departureDate}`} />
          <DetailRow label="Party size" value={String(record.partySize)} />
          <DetailRow label="Emergency contact" value={`${record.emergencyContactName} — ${record.emergencyContactPhone}`} />
          <DetailRow label="Minors in party" value={record.minorsPresent ? record.minorDetails || 'Yes' : 'None'} />
          <DetailRow label="Guest-owned vehicle" value={record.bringingOwnVehicle ? record.vehicleDescription || 'Yes' : 'None'} />
          <DetailRow label="Photo release" value={record.agreePhotoRelease ? 'Granted' : 'Declined'} />
        </View>

        {waiverSections.map((section) => (
          <View key={section.heading} wrap={false}>
            <Text style={styles.sectionHeading}>{section.heading}</Text>
            {section.body.map((paragraph, i) => (
              <Text key={i} style={styles.paragraph}>{paragraph}</Text>
            ))}
          </View>
        ))}

        <View style={styles.signatureBlock}>
          <Text>Electronically signed by {record.guestFullName}</Text>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={record.signatureDataUrl} style={styles.signatureImage} />
          <Text>Signed at: {record.signedAt}</Text>
          {record.ipAddress && <Text>IP address: {record.ipAddress}</Text>}
        </View>
      </Page>
    </Document>
  );
}

export async function renderWaiverPdf(record: SignedWaiverRecord): Promise<Buffer> {
  return renderToBuffer(<WaiverPdfDocument record={record} />);
}
