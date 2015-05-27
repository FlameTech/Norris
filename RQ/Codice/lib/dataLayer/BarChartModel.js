/**
 * name : BarChartModel.js 
 * Module : Norris::Lib::DataLayer
 * Location : /norris/lib/dataLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/12    Sartor Michele
 * -------------------------------------------------
 *  Revisone modulo
 * =================================================
 *  0.0.1     2015/05/05    Sartor Michele
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

/**
 * Description this class rappresent a BarChart Object
 * @class BarChartModel
 * @param {Number} id
 * @param {String} title
 * @param {String} xAxisName
 * @param {String} yAxisName
 * @param {Array} labels
 * @param {Array} data
 * @param {JSON} options
 * @return BarChart
 */
function BarChartModel(id, title, xAxisName, yAxisName, labels, data, options) {

  //Data model created by controller methods
  this._id = id;
  this._title = title;
  this._xAxisName = xAxisName;
  this._yAxisName = yAxisName;
  this._labels = labels;
  this._data = data;
  //Optional properties
  this._series = options.series;
  this._orientation = options.orientation;
  this._showGrid = options.grid;
  this._showLegend = options.legend;
  this._legendPosition = options.legendPosition;
  this._colors = options.colors;
  this._valueType= options.valueType;
  this._decimals= options.decimals;
};

module.exports = BarChartModel;