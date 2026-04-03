import MenuButton from "@/Components/MenuButton";
import Avatar from "../Components/Avatar";

const NavigationBar = () => {
  return (
    <div>
      <div>
        <div className="relative flex flex-col self-start md:flex-row bg-gray-50 border-gray-400 border-b p-2 shadow-sm">
          {/* MenuButton altijd links 8*/}
          <div className="flex shrink-0">
            <button title="Language" className="cursor-pointer">
              <MenuButton />
            </button>
            <span className="flex-col self-center text-4xl p-0 pt-2 font-bold">
              Papo aí
            </span>
          </div>

          {/* Hier kan je knoppen voor navigatie toevoegen */}

          {/*  Spacer: indien van toepassing  */}
          <div className="hidden md:block md:flex-1" />

          {/* Uiterst rechts staat de avatar */}
          <div className="absolute right-2 top-2 md:static md:ml-2">
            <Avatar
              role="student"
              style={{
                width: "3.4rem",
                height: "3.4rem",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
