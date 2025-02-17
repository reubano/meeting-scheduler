import authenticator from '@kloudless/authenticator/src/auth-widget';
import { mapState } from 'vuex';
import { EVENTS } from 'constants';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';

export default {
  name: 'Authenticator',
  components: {
    Dropdown,
    Button,
  },
  props: {
    isUpdating: {
      type: Boolean,
      default: false,
    },
  },
  computed: mapState({
    account: state => state.account,
    calendars: state => (
      state.account.calendars.map(calendar => ({
        text: calendar.name,
        value: calendar.id,
      }))
    ),
    appId: state => state.launchOptions.appId,
    loading: state => state.api.loading.account,
    baseUrl: state => state.launchOptions.globalOptions.baseUrl,
  }),
  methods: {
    onAddAccount(e) {
      // TODO: migrate to authenticator global options
      if (!window.Kloudless) {
        window.Kloudless = {};
      }
      window.Kloudless.baseUrl = this.baseUrl;
      authenticator.stop(e.target);
      const auth = authenticator.authenticator(
        e.target,
        {
          client_id: this.appId,
          scope: 'any:normal.calendar',
        },
        this.handleAuthResult,
      );
      auth.launch();
    },
    handleAuthResult(result) {
      if (!result.account) {
        this.$store.dispatch('api/setErrorMessage', {
          message: 'An error occurred connecting your account.',
        });
      } else {
        this.$store.dispatch('account/setAccount', {
          id: result.account.id,
          account: result.account.account,
          token: result.access_token,
        });
        this.$store.dispatch('event', {
          event: EVENTS.CONNECT_ACCOUNT,
          account: result.account,
          confidentialData: {
            accountToken: result.access_token,
          },
        });
      }
    },
    removeAccount() {
      this.$store.commit({
        type: 'account/reset',
      });
      this.$store.dispatch('event', {
        event: EVENTS.REMOVE_ACCOUNT,
      });
    },
    setCalendarId(event) {
      this.$store.commit({
        type: 'account/setCalendarId',
        calendarId: event.value,
      });
    },
  },
};
