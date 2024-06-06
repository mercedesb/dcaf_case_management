
export default function() {
  return {
    render: function(flash) {
      if (!flash) { return }

      const { alert, notice, danger } = flash
      const text = notice || alert || danger
      
      if (text) {
        const alertClassName = notice ? 'alert-success' : 'alert-danger'
        const flashHtml = `<div class="col-sm-10 flash-message">
          <div class="alert ${alertClassName}">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            ${text}
          </div>
        </div>`

        document.querySelector('#flash').innerHTML = flashHtml
      }

      return null 
    }
  }
}
