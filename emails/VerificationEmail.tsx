import {
  Container,
  Font,
  Head,
  Hr,
  Html,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function Email({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Verification code - Anonymous message</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Container>
        <Section>
          <Row>
            <Text>Hi {username},</Text>
            <Hr />
            <Text>You OTP is: {otp}</Text>
            <Hr />
            <Text>Regards,</Text>
            <Text>Anonymous message team</Text>
          </Row>
        </Section>
      </Container>
    </Html>
  );
}
