import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

enum ClockReadType {
  OClock,
  Half,
  Quarter,
  Random,
}

export interface ExerciseConfig {
  readTypes: Set<ClockReadType>;
  collective: boolean;
}

const DefaultConfig: ExerciseConfig = {
  readTypes: new Set<ClockReadType>(),
  collective: false,
};

function ExerciseSetup(): React.JSX.Element {
  const candidates: ClockReadType[] = [
    ClockReadType.OClock,
    ClockReadType.Half,
    ClockReadType.Quarter,
    ClockReadType.Random,
  ];

  const [config, setConfig] = useState<ExerciseConfig>(DefaultConfig);

  return (
    <>
      <FormControl required>
        <FormLabel component="legend">Difficulty Levels</FormLabel>
        <FormGroup>
          {candidates.map((c) => (
            <FormControlLabel
              control={
                <Checkbox
                  name={ClockReadType[c]}
                  checked={config.readTypes.has(c)}
                  onChange={(e) => {
                    setConfig((prev) => {
                      const checked = e.target.checked;
                      const newCheckedReadTypes = checked
                        ? prev.readTypes.add(c)
                        : new Set<ClockReadType>(
                            [...prev.readTypes].filter((r) => r !== c)
                          );

                      return { ...prev, readTypes: newCheckedReadTypes };
                    });
                  }}
                />
              }
              label={ClockReadType[c]}
            />
          ))}
        </FormGroup>
        <FormLabel component="legend">Format</FormLabel>
        <RadioGroup
          row
          value={config.collective ? "Collective" : "Individual"}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              collective: e.target.value === "Collective",
            }))
          }
        >
          <FormControlLabel
            value="Individual"
            control={<Radio />}
            label="Individual"
          />
          <FormControlLabel
            value="Collective"
            control={<Radio />}
            label="Collective"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default ExerciseSetup;
