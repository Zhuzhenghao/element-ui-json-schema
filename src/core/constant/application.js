import { cloneDeep } from "lodash";

function setValue(fieldsMeta, name, value) {
  if (name in fieldsMeta) {
    fieldsMeta[name].value = value;
  } else {
    fieldsMeta[name] = value;
  }
  return fieldsMeta;
}

function getValue(fieldsMeta, name) {
  return fieldsMeta[name];
}

function getValues(fieldsMeta, names) {
  let allValues = {};
  if (names && names.length) {
    names.forEach((item) => {
      allValues[item] = getValue(fieldsMeta, item);
    });
  } else {
    allValues = cloneDeep(fieldsMeta);
  }

  return allValues;
}

export { setValue, getValue, getValues };
