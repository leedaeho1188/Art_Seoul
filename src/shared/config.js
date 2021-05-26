const config = {
  api : 'http://52.78.108.93',
  token : {
    headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
  }
}

export { config }