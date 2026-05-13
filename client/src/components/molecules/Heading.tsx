import Title from "@/components/atoms/Title";
import Text from "@/components/atoms/Text";
import { useTranslations } from "next-intl";

export default function Heading()
 {
    const t=useTranslations("HomePage.heading.title");
    const tText=useTranslations("HomePage.heading.text")
  return (
    <div>
        <Title variant="primary" size="xl" className="ds-font-semibold">
        {/* How It <span className="ds-text-alt ">Works </span> */}
              {t("how")} <span className="ds-text-alt ">{t("works")}</span>
      </Title>

      <Text variant="secondary" size="lg" className="ds-font-regular">{tText("desc")}</Text>
    </div>
  )
}
