/**
 * A standalone module to setup vue and import styles from
 * dependencies to specify output CSS order.
 * This file cannot be merged into MeetingSchedulerView.js, it has to be a
 * standalone module.
 * This is to cope with a known issue for MiniCssExtractPlugin:
 * in production mode, the output CSS is not in correct order when putting
 * these imports in the beginning of MeetingSchedulerView.js
 * (App's styles come before base styles).
 * issue: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/188
 */

// Vuetify base stylesheet, required
import 'vuetify/src/stylus/app.styl';

// Only import used components here
import Vuetify, {
  VApp,
  VIcon,
  VContent,
  VContainer,
  VForm,
  VExpansionPanel,
  VExpansionPanelContent,
  VTextField,
  VBtn,
  VBtnToggle,
  VLayout,
  VFlex,
  VAutocomplete,
  VProgressCircular,
} from 'vuetify/lib';
import Vue from 'vue';

// // font styles
import 'view/css/roboto.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  components: {
    VApp,
    VIcon,
    VContent,
    VContainer,
    VForm,
    VExpansionPanel,
    VExpansionPanelContent,
    VTextField,
    VBtn,
    VBtnToggle,
    VLayout,
    VFlex,
    VAutocomplete,
    VProgressCircular,
  },
  /**
   * Disable Vuetify's theme options because we need to customize
   * colors for components that don't support or have limited support of
   * color APIs. Hence, define and manage all colors in scss instead.
   *
   * Specify theme: false is required, otherwise it would insert default theme
   * styles and interfere with our styles
   */
  theme: false,
});
