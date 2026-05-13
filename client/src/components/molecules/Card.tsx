import Text from "@/components/atoms/Text";
import Title from "@/components/atoms/Title";
import Images from "@/components/atoms/Images";
import Button from "@/components/atoms/Button";
import { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

interface Props {
  text: string;
  title: string;
  image: string | StaticImageData;
}

export default function Card({ text, title, image }: Props) {
  const t = useTranslations();

  return (
    <div className="ds-rounded-2xl py-8 px-4 ds-bg ds-shadow-lg space-y-6 h-130 w-fit">
      <Images
        src={image}
        alt="card image"
        width={280}
        height={254}
        className="ds-rounded-lg "
      />
      <div className=" flex flex-col gap-y-4 h-fit w-70 p-0">
        <Title
          size="md"
          center
          className=" w-full font-semibold text-lg leading-[100%] tracking-normal align-middle  h-7"
        >
          {t(title)}
        </Title>

        <Text variant="disabled" center>
          {t(text)}
        </Text>
      </div>

      <Button
        className="w-50 h-10"
        variant="primary"
        size="md"
        isRounded={false}
        center
      >
        {t("HomePage.useTemplate")}
      </Button>
    </div>
  );
}
