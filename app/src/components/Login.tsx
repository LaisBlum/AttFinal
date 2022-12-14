import { Dispatch, FormEventHandler, SetStateAction } from "react";

export default function ({ setRoute }: { setRoute: Dispatch<SetStateAction<string>> }) {
  const enviarDados: FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault()
    const { email, password } = ev.currentTarget

    const request = await fetch(`/api/login/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const responseData = await request.json()

    if (request.status >= 200 && request.status <= 299) {
      localStorage.setItem("token", responseData.token)
      alert("PARABAEINZ!")
      setRoute("teste")
      return
    }

    if (responseData.error) {
      alert(responseData.error)
      return
    }

    alert("Cara! deu um erro tão foda, que eu nem sei o que foi!")
  }


  return <>
    <form className="container" onSubmit={enviarDados}>
      <h1>Login</h1>
      <div className="containerDiv">
        <label>EMAIL</label>
        <input name="email" placeholder="email" />
      </div>
      <div className="containerDiv">
        <label>SENHA</label>
        <input name="password" type="password" placeholder="password" />
      </div>

      <div className="containerBtns">
        <button onClick={() => { }}>login</button>
        <button onClick={() => setRoute("cadastro")}>cadastrar</button>
        <button onClick={() => setRoute("teste")}>verificação</button>
      </div>
    </form>
  </>
}