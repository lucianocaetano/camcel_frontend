
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    function info () {
      $q.dialog({
        title: 'Alert',
        message: 'Some message'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    return {
      info
    }
  }
}

