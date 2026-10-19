import type { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select
      value={mapType}
      onValueChange={(value) => {
        if(value!==null){
          setMapType(value);
        }
      }}
    >
      <SelectTrigger className="w-full xs:w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-100">
        {mapTypes.map((map) => (
          <SelectItem key={map} value={map} className={"capitalize"}>
            {map}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const mapTypes = [
  "tmp2m",
  "precip",
  "pressure",
  "wind",
  "none"
];
