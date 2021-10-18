import React, { useState } from "react";
import "./App.css";
import { HexColorPicker } from "react-colorful";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

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
  const [textOutlineColour, setTextOutlineColour] = useState("#ffffff");
  const [showTextOutlineColourPicker, setTextOutlineColourPicker] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [showTotalVotes, setShowTotalVotes] = useState(false);
  const [chartWidth, setChartWidth] = useState(90);
  const [showInfo, setShowInfo] = useState(false);

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

  const getTextOutlineStyle = () => {
    return `
      -1px -1px 0 ${textOutlineColour},
      0 -1px 0 ${textOutlineColour},
      1px -1px 0 ${textOutlineColour},
      1px 0 0 ${textOutlineColour},
      1px 1px 0 ${textOutlineColour},
      0 1px 0 ${textOutlineColour},
      -1px 1px 0 ${textOutlineColour},
      -1px 0 0 ${textOutlineColour}
    `;
  };

  const renderBars = () => {
    const totalCount = getTotalVotes();

    return graphItems.map((graphItem, index) => {
      if (graphItem.name && graphItem.count >= 0) {
        const barWidth = ((graphItem.count || 0) / totalCount) * 100 + "%";
        return (
          <div key={`graph-bar-${index}`} className="graph-item">
            <div className="graph-info" style={showOutline ? {textShadow: getTextOutlineStyle()} : {}}>
              {graphItem.name} <span className="graph-count">({graphItem.count})</span>
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

  const updateChartWidth = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setChartWidth(newValue);
    }
  }

  const chartWidthLabel = (value: number) => {
    return `${value}%`;
  }

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setGraphTitle(newValue);
  };

  const updateTextColour = (colour: string) => {
    setTextColour(colour);
  };

  const updateTextOutlineColour = (colour: string) => {
    setTextOutlineColour(colour);
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

  const updateTextOutlineColourFromText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTextOutlineColour(event.target.value);
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
      <Modal open={showInfo} aria-labelledby="modal-info" aria-describedby="modal-modal-description" onClose={() => setShowInfo(!showInfo)}>
        <div className="modal-box">
          <h3 style={{marginTop: 8}}>How to add as a stream overlay</h3>
          <ul>
            <li>
              Add a Window Capture of this browser window
            </li>
            <li>
              Crop the capture down to the chart area
            </li>
            <li>
              Use a chroma/colour key to make the chart background transparent
            </li>
          </ul>
          <h3 style={{marginTop: 8}}>How to use the chart builder</h3>
          <ul>
            <li>
              Click <Icon fontSize="small">add_circle</Icon> to add a new item to the chart
            </li>
            <li>
              Bars will only show on the chart if they have a name and a count
            </li>
            <li>
              Bars will update in realtime when names and counts are changed
            </li>
            <li>
              To remove an item from the chart, you can either blank out the item's name or click the <Icon fontSize="small">delete_forever</Icon> next to the item
            </li>
            <li>
              To clear the chart, click <Icon fontSize="small">layers_clear</Icon> at the top of the items list
            </li>
          </ul>
        </div>
      </Modal>
      <div className="main-chart" style={{backgroundColor: chromaColour, color: textColour, width: chartWidth + "%"}}>
        <div className="graph-title-area" style={showOutline ? {textShadow: getTextOutlineStyle()} : {}}>
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
            <Tooltip title="How to use">
              <IconButton color="primary" onClick={() => setShowInfo(!showInfo)}><Icon>info</Icon></IconButton>
            </Tooltip>
          </div>
          <div className="form-group">
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={showBorder} onChange={() => setShowBorder(!showBorder)} inputProps={{ 'aria-label': 'controlled' }} />}
                label="Chart axis lines" />
              <FormControlLabel
                control={<Switch checked={showOutline} onChange={() => setShowOutline(!showOutline)} inputProps={{ 'aria-label': 'controlled' }} />}
                label="Outline on text" />
              <FormControlLabel
                control={<Switch checked={showTotalVotes} onChange={() => setShowTotalVotes(!showTotalVotes)} inputProps={{ 'aria-label': 'controlled' }} />}
                label="Total votes" />
              <FormControlLabel
                className="slider-label"
                control={<Slider value={chartWidth} aria-label="Chart width" valueLabelFormat={chartWidthLabel} getAriaValueText={chartWidthLabel} valueLabelDisplay="auto" onChange={updateChartWidth} />}
                label="Chart width"
                labelPlacement="top" />
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
            <TextField id="graph-text" label="Text outline colour" variant="outlined" value={textOutlineColour} onChange={updateTextOutlineColourFromText} />
            <Tooltip title="Toggle text outline colour picker">
              <IconButton color="primary" onClick={() => setTextOutlineColourPicker(!showTextOutlineColourPicker)}><Icon>{showTextOutlineColourPicker ? "cancel" : "palette"}</Icon></IconButton>
            </Tooltip>
            { showTextOutlineColourPicker && <div className="colour-picker">
              <HexColorPicker className="picker" color={textOutlineColour} onChange={ updateTextOutlineColour } />
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
