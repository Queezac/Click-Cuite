const conversionUtils = {
  mLToL: (milliliters) => milliliters / 1000,

  mLToCL: (milliliters) => milliliters / 10,

  LToML: (liters) => liters * 1000,

  CLToML: (centiliters) => centiliters * 10,

  mLToString: (milliliters) => {
    const units = [
      { name: "cL", value: 10 },
      { name: "L", value: 1000 },
      { name: "kL", value: 1000000 },
      { name: "ML", value: 1000000000 },
      { name: "GL", value: 1000000000000 },
      { name: "TL", value: 1000000000000000 },
    ];
    const unit =
      units
        .slice()
        .reverse()
        .find((u) => milliliters >= u.value) || units[0];

    const value = (milliliters / unit.value).toFixed(2);

    return `${value} ${unit.name}`;
  },
};

export default conversionUtils;
