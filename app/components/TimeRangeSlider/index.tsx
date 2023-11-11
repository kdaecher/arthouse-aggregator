/*
Adapted from: https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816 
*/

import React, { useRef, useState, useEffect } from 'react';

import './styles.css';

const MIN_VALUE = 0;
const MAX_VALUE = 719;

type Props = {
  // startTime: string;
  // endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  startTime: string;
  endTime: string;
};

// ex: 0 ==> 12:00pm
// ex: 75 ==> 1:25pm
// ex: 720 => 12:00am
const convertValueToTime = (value: number) => {
  const hours = Math.floor(value / 60)
  const mins = value % 60;

  return `${hours}:${mins}pm`;
};

const convertTimeToValue = (timeStr: string) => {
  const [time, period] = timeStr.split(/([ap]m)/);
  const [hour, minute] = time.split(":");

  if (parseInt(time) === 12 && period === 'pm') {
    return parseInt(minute);
  }
  return parseInt(hour) * 60 + parseInt(minute);
}

export default function ({ setStartTime, setEndTime, startTime, endTime }: Props) {
  const [fromValue, setFromValue] = useState(convertTimeToValue(startTime));
  const [toValue, setToValue] = useState(convertTimeToValue(endTime));
  // const fromValue = convertTimeToValue(startTime);
  // const toValue = convertTimeToValue(endTime);

  const fromSliderRef = useRef<HTMLInputElement>(null);
  const toSliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fromSliderRef.current || !toSliderRef.current) {
      return;
    }

    fillSlider(fromSliderRef.current, toSliderRef.current, '#C6C6C6', '#0587f7', toSliderRef.current);
    setToggleAccessible(toSliderRef.current);
  }, [fromSliderRef, toSliderRef]);

  function controlFromSlider() {
    const fromSlider = fromSliderRef.current;
    const toSlider = toSliderRef.current;

    if (!fromSlider || !toSlider) {
      return;
    }

    const fromString = fromSlider.value;
    const toString = toSlider.value;

    const [from, to] = getParsed(fromString, toString);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#0587f7', toSlider);
    if (from > to) {
      fromSlider.value = toSlider.value;
      setFromValue(to);
      setStartTime(convertValueToTime(to));
    } else {
      setFromValue(from);
      setStartTime(convertValueToTime(from));
    }
  }

  function controlToSlider() {
    const fromSlider = fromSliderRef.current;
    const toSlider = toSliderRef.current;

    if (!fromSlider || !toSlider) {
      return;
    }

    const fromString = fromSlider.value;
    const toString = toSlider.value;

    const [from, to] = getParsed(fromString, toString);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#0587f7', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
      setToValue(to);
      setEndTime(convertValueToTime(to));
    } else {
      toSlider.value = fromSlider.value;
      setToValue(from);
      setEndTime(convertValueToTime(from));
    }
  }

  function getParsed(currentFrom: string, currentTo: string) {
    const from = parseInt(currentFrom, 10);
    const to = parseInt(currentTo, 10);
    return [from, to];
  }

  function fillSlider(from: HTMLInputElement, to: HTMLInputElement, sliderColor: string, rangeColor: string, controlSlider: HTMLInputElement) {
    const rangeDistance = parseInt(to.max) - parseInt(to.min);
    const fromPosition = parseInt(from.value) - parseInt(to.min);
    const toPosition = parseInt(to.value) - parseInt(to.min);
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
      ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  function setToggleAccessible(currentTarget: HTMLInputElement) {
    const toSlider = toSliderRef.current;

    if (!toSlider) {
      return;
    }

    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = (2).toString();
    } else {
      toSlider.style.zIndex = (0).toString();
    }
  }

  return (
    <div className="flex flex-col w-full mt-9 mb-6">
      <div className="relative mb-3">
        <input
          ref={fromSliderRef}
          id="fromSlider"
          type="range"
          value={fromValue}
          min={MIN_VALUE}
          max={MAX_VALUE}
          onInput={controlFromSlider}
        />
        <input
          ref={toSliderRef}
          id="toSlider"
          type="range"
          value={toValue}
          min={MIN_VALUE}
          max={MAX_VALUE}
          onInput={controlToSlider}
        />
      </div>
      <div className="flex flex-row justify-between">
        <span>12pm</span>
        <span>6pm</span>
        <span>12am</span>
      </div>
    </div>
  )
}