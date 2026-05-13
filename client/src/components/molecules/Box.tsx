import Text from "@/components/atoms/Text";
import Title from "@/components/atoms/Title";
import { useTranslations } from "next-intl";
interface Props {
  text: string;
  title: string;
}
export default function Box({ text, title }: Props) {
  const t = useTranslations();
  return (
    <div className="w-75 ds-rounded-md p-7 ds-bg ds-shadow-lg">
      <Title variant="primary" size="lg">
        {t(title)}
      </Title>
      <Text variant="disabled" size="md">
        {t(text)}
      </Text>
    </div>
  );
}
