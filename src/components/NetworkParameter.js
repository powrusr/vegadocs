import React, { useEffect, useContext } from 'react';
import { NetworkParameterContext, fetchData } from './lib/NetworkParameterStore';

const explorerUrl = {
  'TESTNET': 'https://explorer.fairground.wtf/network-parameters',
  'MAINNET': 'https://explorer.vega.xyz/network-parameters',
}

const factor = Math.pow(10, 18)
const formatters = {
  'governanceToken': (value) => parseInt(value) / factor,
  'percent': (value) => `${value * 100}%`
}

/**
 * Renders a network parameter and its value, fetching the value live
 * from the relevant network if possible, but using build time values
 * by default 

 * @param {Object} props 
 */
export default function NetworkParameter(props) {
  const vega_network = props?.frontMatter?.vega_network || 'TESTNET';
  const hideName = props.hideName ? props.hideName : false
  const hideValue = props.hideValue ? props.hideValue : false
  const suffix = props.suffix ? props.suffix : false

  if (!vega_network) {
    throw new Error("Missing vega_network");
  }

  const dataForNetwork = useContext(NetworkParameterContext)
  let type, data
  // Server side render / pre-render will use defaults (generated by build.sh)
  if(!!dataForNetwork[vega_network].latest) {
    // Used for minor styling differences for live versus buildtime
    type = 'live'
    data = dataForNetwork[vega_network].latest 
  } else {
    type = 'buildtime'
    data = dataForNetwork[vega_network].buildTime 
  }

  useEffect(async () => {
    // This is only triggered on client side render, and will be blocked
    // from fetching multiple times
    await fetchData(vega_network)
  }, [vega_network]);

  if (data) {
    let skipSuffixFix = false

    const value = data[props.param]
    let displayValue
    let formattedValue

    // Special special case for 0 or 1 token values
    if (props.formatter === 'governanceToken') {
      if (value === '1' || value === 1) {
        formattedValue = 'more than 0'
        skipSuffixFix = true
      } else if (value === '0') {
        formattedValue = '0 or more'
        skipSuffixFix = true
      } else {
        formattedValue = props.formatter && formatters[props.formatter] ? formatters[props.formatter](value) : value
      }
    } else { 
      formattedValue = props.formatter && formatters[props.formatter] ? formatters[props.formatter](value) : value
    }

    if (suffix) {
      let suffixCorrected = suffix
      if (!skipSuffixFix && suffix === 'tokens' && (value === '1' || formattedValue === 1)) {
        suffixCorrected = 'token'
      }

      displayValue = <strong>{formattedValue} {suffixCorrected}</strong>
    } else {
      displayValue = <strong>{formattedValue}</strong>
    }

    const name = props.name ? props.name : props.param 

    return (<a href={`${explorerUrl[vega_network]}#${props.param}`} className={`networkparameter networkparameter--${type}`} title={`Network parameter '${props.param}' is '${value}'`}>
      <span className="networkparametericon">👀</span>
      {(hideName ? null : <span className="networkparametername">{name}</span>)}
      {(hideName || hideValue? '' : ': ')}
      {(hideValue ? null : <span className="networkparametervalue">{displayValue || `Could not find ${props.param}`}</span>)}
    </a>);
  } else {
    // Note this shouldn't happen, as there should be build time defaults
    return <b>Loading...</b>;
  }
}