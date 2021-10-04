import React, { useState } from "react";
import "./App.css";
import { HexColorPicker } from "react-colorful";
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface IGraphItem {
  name: string;
  count: number;
}

export default function Home() {
  const blankItems: IGraphItem[] = [];

  const [graphItems, setGraphItems] = useState(blankItems);
  const [graphTitle, setGraphTitle] = useState("");
  const [chromaColour, setChromaColour] = useState("#00ff00");
  const [showChromaColourPicker, setChromaColourPicker] = useState(false);
  const [barColour, setBarColour] = useState("#ff0000");
  const [showBarColourPicker, setBarColourPicker] = useState(false);
  const [textColour, setTextColour] = useState("#000000");
  const [showTextColourPicker, setTextColourPicker] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [showTotalVotes, setShowTotalVotes] = useState(false);

  const updateItem = (index: number, item: IGraphItem) => {
    if (! graphItems[index]) {
      setGraphItems([
        ...graphItems,
        Object.assign({}, graphItems[index], item),
      ]);
    } else {
      setGraphItems([
        ...graphItems.slice(0, index),
        Object.assign({}, graphItems[index], item),
        ...graphItems.slice(index + 1)
      ]);
    }
  }

  const getTotalVotes = () => {
    let totalCount = 0;
    graphItems.forEach((graphItem) => {
      if (graphItem) {
        totalCount += graphItem.count || 0;
      }
    });

    return totalCount;
  };

  const renderBars = () => {
    const totalCount = getTotalVotes();

    return graphItems.map((graphItem, index) => {
      if (graphItem.name && graphItem.count) {
        const barWidth = ((graphItem.count || 0) / totalCount) * 100 + "%";
        return (
          <div key={`graph-bar-${index}`} className="graph-item">
            <div className="graph-info">
              {graphItem.name ? graphItem.name : ""} <span className="graph-count">{graphItem.count ? `(${graphItem.count})` : ""}</span>
            </div>
            <div className="graph-bar" style={{maxWidth : barWidth, backgroundColor: barColour}}>
              &emsp;
            </div>
          </div>
        )
      }

      return "";
    });
  };

  const renderForm = () => {
    return graphItems.map((graphItem, index) => {
      return (
        <div key={`graph-item-${index}`} className="form-item">
          <span className="graph-form-number">{index + 1}</span>

          <TextField id={`graph-item-${index}-name`} label="Name" onChange={updateName} variant="outlined"
            value={graphItems[index].name} />
          <TextField id={`graph-item-${index}-count`} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            label="Count" onChange={updateValue} variant="outlined" value={graphItems[index].count} />

          <Tooltip title="Add one to count">
            <IconButton aria-label="Add one to count" id={`graph-item-${index}-add`} onClick={() => addOneToValue(index)}>
              <Icon>exposure_plus_1</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Subtract one from count">
            <IconButton aria-label="Subtract one from count" id={`graph-item-${index}-sub`} onClick={() => subOneFromValue(index)}>
              <Icon>exposure_neg_1</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Remove item">
            <IconButton aria-label="Remove item" id={`graph-item-${index}-remove`} onClick={removeItem}>
              <Icon>delete_forever</Icon>
            </IconButton>
          </Tooltip>
        </div>
      );
    });
  };

  const updateName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const inputId = event.target.id;
    const inputIndexArray = (inputId.match(/[\d]+/g));

    if (inputIndexArray) {
      const currentIndex = parseInt(inputIndexArray[0]);
      updateItem(currentIndex, {name: newValue, count: graphItems[currentIndex].count});
    }
  };

  const updateValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
    const newValue = event.target.value;
    const newValueNumber = parseInt(newValue);
    const inputId = event.target.id;
    const inputIndexArray = (inputId.match(/[\d]+/g));

    if (inputIndexArray) {
      const currentIndex = parseInt(inputIndexArray[0]);
      updateItem(currentIndex, {name: graphItems[currentIndex].name, count: (Number.isNaN(newValueNumber) ? 0 : newValueNumber)});
    }
  };

  const addOneToValue = (index: number) => {
    const currentCount = graphItems[index].count;
    updateItem(index, {name: graphItems[index].name, count: currentCount + 1});
  }

  const subOneFromValue = (index: number) => {
    if (graphItems[index] && graphItems[index].count !== undefined) {
      const currentItem = graphItems[index];
      let newCount = currentItem.count - 1;

      // Prevent less than zero
      if (newCount < 0) {
        newCount = 0;
      }

      updateItem(index, {name: graphItems[index].name, count: newCount});
    }
  }

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setGraphTitle(newValue);
  };

  const updateTextColour = (colour: string) => {
    setTextColour(colour);
  };

  const updateBarColour = (colour: string) => {
    setBarColour(colour);
  };

  const updateChromaColour = (colour: string) => {
    setChromaColour(colour);
  };

  const updateTextColourFromText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTextColour(event.target.value);
  };

  const updateBarColourFromText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setBarColour(event.target.value);
  };

  const updateChromaColourFromText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setChromaColour(event.target.value);
  };

  const addNewItem = () => {
    const newIndex = graphItems.length;
    updateItem(newIndex, { name: "", count: 0 });
  };

  const removeItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const inputId = event.currentTarget.id;
    const inputIndexArray = (inputId.match(/[\d]+/g));

    if (inputIndexArray) {
      const currentItems = Array.from(graphItems);
      const currentIndex = parseInt(inputIndexArray[0]);

      if (currentItems[currentIndex]) {
        currentItems.splice(currentIndex, 1);
        setGraphItems(currentItems);
      }
    }
  };

  const removeAllItems = () => {
    setGraphItems(blankItems);
  };

  return (
    <div className="chart">
      <div className="main-chart" style={{backgroundColor: chromaColour, color: textColour}}>
        <div style={{marginBottom: "32px"}}>
          <div className="graph-title">
            {graphTitle}
          </div>
          { showTotalVotes && <div className="graph-subtitle">
            {getTotalVotes()} total votes
          </div> }
        </div>
        <div className="graph-area" style={{
          borderLeftColor: textColour,
          borderLeftWidth: (showBorder ? "2px" : "0px"),
          borderBottomColor: textColour,
          borderBottomWidth: (showBorder ? "2px" : "0px")
        }}>
          {renderBars()}
        </div>
      </div>
      <div className="chart-options">
        <div className="title-form">
          <div className="form-group">
            <TextField id="graph-title" label="Chart Title" variant="outlined" value={graphTitle} onChange={(event) => updateTitle(event)} />
          </div>
          <div className="form-group">
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={showBorder} onChange={() => setShowBorder(!showBorder)} inputProps={{ 'aria-label': 'controlled' }} />}
                label="Chart axis lines" />
              <FormControlLabel
                control={<Switch checked={showTotalVotes} onChange={() => setShowTotalVotes(!showTotalVotes)} inputProps={{ 'aria-label': 'controlled' }} />}
                label="Total votes" />
            </FormGroup>
          </div>
          <div className="form-group">
            <TextField id="graph-colour" label="Bar colour" variant="outlined" value={barColour} onChange={updateBarColourFromText} />
            <Tooltip title="Toggle bar colour picker">
              <IconButton color="primary" onClick={() => setBarColourPicker(!showBarColourPicker)}><Icon>{showBarColourPicker ? "cancel" : "palette"}</Icon></IconButton>
            </Tooltip>
            { showBarColourPicker && <div className="colour-picker">
              <HexColorPicker className="picker" color={barColour} onChange={ updateBarColour } />
              </div> }
          </div>
          <div className="form-group">
            <TextField id="graph-text" label="Text/axis colour" variant="outlined" value={textColour} onChange={updateTextColourFromText} />
            <Tooltip title="Toggle text colour picker">
              <IconButton color="primary" onClick={() => setTextColourPicker(!showTextColourPicker)}><Icon>{showTextColourPicker ? "cancel" : "palette"}</Icon></IconButton>
            </Tooltip>
            { showTextColourPicker && <div className="colour-picker">
              <HexColorPicker className="picker" color={textColour} onChange={ updateTextColour } />
              </div> }
          </div>
          <div className="form-group">
            <TextField id="graph-text" label="Chroma key colour" variant="outlined" value={chromaColour} onChange={updateChromaColourFromText} />
            <Tooltip title="Toggle chroma key colour picker">
              <IconButton color="primary" onClick={() => setChromaColourPicker(!showChromaColourPicker)}><Icon>{showChromaColourPicker ? "cancel" : "palette"}</Icon></IconButton>
            </Tooltip>
            { showChromaColourPicker && <div className="colour-picker">
              <HexColorPicker className="picker" color={chromaColour} onChange={ updateChromaColour } />
              </div> }
          </div>
        </div>
        <div className="items-form">
          <h2>
            <span>Chart Items</span>
            <Tooltip title="Add item">
              <IconButton onClick={addNewItem}><Icon>add_circle</Icon></IconButton>
            </Tooltip>
            <Tooltip title="Remove all items">
              <IconButton onClick={removeAllItems}><Icon>layers_clear</Icon></IconButton>
            </Tooltip>
          </h2>
          {renderForm()}
        </div>
      </div>
    </div>
  );
}
