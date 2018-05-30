import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Store from '../Store';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ExportFunctionality.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  version: {
    color: '#ccc'
  },
  reload: {
    position: 'absolute',
    right: '10px'
  }
};

function exportToPDF() {
  setTimeout(() => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });

    var scaleFactor = 1 / (window.devicePixelRatio || 1),
    margin = 8,
    width = (297 - margin) * scaleFactor,
    height = (210 - margin) * scaleFactor,
    diagramBodyHeight = 150 * scaleFactor,
    fontSize = 3.8 * scaleFactor,
    wrapperMargin = 5 * scaleFactor,
    emojiHeight = 15 * scaleFactor,
    emojiFontSize = 3 * scaleFactor,
    barBorderRadius = 3 * scaleFactor,
    barTopMargin = -18 * scaleFactor,
    barPadding = .5 * scaleFactor,
    styleText = ('#exportCondition, #exportFeelings { width: {width}mm; height: {height}mm; margin: 0 auto; } ' + 
    '#exportCondition .diagramBodyConditions, #exportFeelings .diagramBodyFeelings { height: {diagramBodyHeight}mm; width: 100%; margin: 0; } ' + 
    '#exportCondition h3, #exportFeelings h3 { font-size:{fontSize}mm !important; padding: 0 10mm 0 10mm; }'+
    '#exportFeelings .diagramBodyFeelingsWrapper { overflow: visible; margin-left: {wrapperMargin}mm; }' +  
    '#exportFeelings .diagramBodyFeelings .bar { border-top-right-radius:{barBorderRadius}mm; border-top-left-radius:{barBorderRadius}mm; }' +
    '#exportFeelings .diagramBodyFeelings .bar > div { margin-top: {barTopMargin}mm; }' +
    '#exportFeelings .diagramBodyFeelings img { max-height:{emojiHeight}mm; }' +
    '#exportFeelings .diagramBodyFeelings > div > div { padding: 0 {barPadding}mm 0 {barPadding}mm; }' +
    '#exportFeelings .diagramBodyFeelings img + div { font-size:{emojiFontSize}mm; font-weight: normal; }'),
    replace = function(name, value) {
      var pattern = '{' + name + '}';

      while(styleText.indexOf(pattern) > -1) {
        styleText = styleText.replace(pattern, value);
      }
    };

    replace('width', width);
    replace('height', height);
    replace('diagramBodyHeight', diagramBodyHeight);
    replace('fontSize', fontSize);
    replace('wrapperMargin', wrapperMargin);
    replace('barBorderRadius', barBorderRadius);
    replace('barTopMargin', barTopMargin);
    replace('emojiHeight', emojiHeight);
    replace('emojiFontSize', emojiFontSize);
    replace('barPadding', barPadding);
    
    var styleTag = document.head.appendChild(document.createElement('style'));

    styleTag.appendChild(document.createTextNode(styleText));
    styleTag.setAttribute("type", "text/css");

    requestAnimationFrame(() => {
      var exportToCanvas = document.querySelector("#exportCondition");
    
      html2canvas(exportToCanvas).then((canvas) => {
        pdf.addImage(canvas.toDataURL('image/png'), 'JPEG', 0, 0);
        pdf.addPage();
        
        exportToCanvas = document.querySelector("#exportFeelings");
    
        html2canvas(exportToCanvas).then((canvas) => {
          pdf.addImage(canvas.toDataURL('image/png'), 'JPEG', 0, 0);
          pdf.save('Trivsel - ' + Store.subject + ".pdf");

          Store.screen = "conditionResults";
        });
      });
    });
  }, 100);  
}

function ExportFunctionality(props) {
  exportToPDF();
  const { classes } = props;
  return <div class="loaderWrapper"><div class="loader"></div></div>;
}

ExportFunctionality.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExportFunctionality);