module.exports = {
  plugins: [
    require('postcss-custom-media')({}),
    require('postcss-custom-selectors')({}),
    require('postcss-combine-duplicated-selectors')({}),
    require('postcss-selector-matches')({}),
    require('postcss-selector-not')({}),
    require('postcss-nesting')({}),
  ],
};
