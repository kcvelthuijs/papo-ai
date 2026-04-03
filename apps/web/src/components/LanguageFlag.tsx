import { useLanguageStore } from "../Stores/LanguageStore";
import AppIcon from "@/assets/papo-logo.svg";

import ImageComponent from "./ImageComponent";

const LanguageFlag = () => {
  const { currentLanguageConfig: language } = useLanguageStore.getState();

  return (
    <div className="flex flex-col self-center font-normal px-2">
      {language ? (
        <ImageComponent name="pt.svg" tree={["flags"]} size="none" />
      ) : (
        <div className="flex flex-col object-cover">
          <img
            src={AppIcon}
            className="object-cover "
            alt="Geen taal geselecteerd"
          />
        </div>
      )}{" "}
    </div>
  );
};

export default LanguageFlag;
