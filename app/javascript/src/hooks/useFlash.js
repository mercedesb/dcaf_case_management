
export default function() {
  return function(flash) {
    if (!flash) { return }

    const { alert, notice, danger } = flash

    let flashHtml;

    if (notice) {
      flashHtml = `<div class="col-sm-10 flash-message">
        <div class="alert alert-success">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
          ${notice}
        </div>
      </div>`
    } else{
      flashHtml = `<div class="col-sm-10 flash-message">
        <div class="alert alert-danger">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
          ${alert || danger}
        </div>
      </div>`
    }

    document.querySelector('#flash').innerHTML = flashHtml
    return null 
  }
}
