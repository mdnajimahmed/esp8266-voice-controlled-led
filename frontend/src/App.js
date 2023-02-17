import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { useSpeechRecognition } from "react-speech-kit";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const sendCommand = (command) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(command);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("http://localhost:3001/led", requestOptions);
};

function App() {
  const [checked, setChecked] = useState(true);
  const [changeInProgress, setChangeInProgress] = useState(false);
  const [value, setValue] = useState("");
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });
  const handleSwitchToggle = (e) => {
    if (changeInProgress) {
      console.log("Skipping.... since one api call is in progress");
    } else {
      console.log("Chaning LED state");
      setChecked(e.target.checked);
      setChangeInProgress(true);
    }
  };

  useEffect(() => {
    console.log("value = ->" + value + "<-");
    if (value.trim() === "switch on") {
      setChecked(true);
    } else if (value.trim() === "switch off") {
      setChecked(false);
    }
  }, [value]);
  useEffect(() => {
    console.log("simulating api call");
    const command = {
      signal: checked ? "on" : "off",
    };
    sendCommand(command)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setChangeInProgress(false);
      })
      .catch((error) => console.log("error", error));
  }, [checked]); // Only re-run the effect if checked changes
  return (
    <div style={{
      ...styles,
      marginLeft:"350px",
      marginTop:"250px"
    }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 256,
            height: 256,
          },
        }}
      >
        <Paper elevation={3} style={styles}>
          <div
            style={{
              marginTop: "80px",
            }}
          >
            <Switch checked={checked} onChange={handleSwitchToggle} />
          </div>
        </Paper>
        <Paper centered>
          <textarea
            style={{
              marginLeft: "20px",
              marginTop: "100px",
            }}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Paper>
        <Paper elevation={3} centered style={styles}>
          <Stack
            spacing={2}
            direction="row"
            centered
            style={{
              marginLeft: "40px",
              marginTop: "100px",
            }}
          >
            <Button onClick={listen} variant="contained">
              Listen
            </Button>
            <Button onClick={stop} variant="outlined">
              Stop
            </Button>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}

const styles = {
  textAlign: "center",
};
export default App;
