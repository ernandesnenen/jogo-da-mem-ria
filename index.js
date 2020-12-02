function onLoad(){
  const dependencias = {
    tela:Tela,
    util:Util
  }
  const jogoDamenmoria = new LGame(dependencias)
  jogoDamenmoria.inicializar()
}
window.onload = onLoad