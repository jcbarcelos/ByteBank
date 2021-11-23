import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App, { calcularNovoSaldo } from "./App";
import { act } from "react-dom/test-utils";
describe("Componente principal", () => {
  describe("Quando abro o app do banco", () => {
    it("O nome esta sendo exibido", () => {
      act(() => {
        render(<App />);
        expect(screen.getByText("ByteBank")).toBeInTheDocument();
      });
    });
    it("O saldo esta sendo exibido ", () => {
      act(() => {
        render(<App />);

        expect(screen.getByText("Saldo:")).toBeInTheDocument();
      });
    });
    it("O botão de realizar transação é exebido ", () => {
      act(() => {
        render(<App />);
        expect(screen.getByText("Realizar operação")).toBeInTheDocument();
      });
    });
  });

  describe("Quando realizo uma transação", () => {
    describe("o que é um saque,", () => {
      it(" o valor vai diminuir", () => {
        const valores = {
          transacao: "saque",
          valor: 50
        };
        const novoSaldo = calcularNovoSaldo(valores, 150);
        expect(novoSaldo).toBe(100);
      });
      it("a transação deve ser realizada", () => {
        render(<App />);
        const saldo = screen.getByText("R$ 1000");
        const transacao = screen.getByLabelText("Saque");
        const valor = screen.getByTestId("valor");
        const botaoTransacao = screen.getByText("Realizar operação");

        expect(saldo.textContent).toBe("R$ 1000");

        fireEvent.click(transacao, { target: { value: "saque" } });
        fireEvent.change(valor, { target: { value: 10 } });
        fireEvent.click(botaoTransacao);

        expect(saldo.textContent).toBe("R$ 990");
      });
    });

    describe("o que é um deposito,", () => {
      it("o que é um deposito, o valor ser aumentado", () => {
        const valores = {
          transacao: "deposito",
          valor: 50
        };
        const novoSaldo = calcularNovoSaldo(valores, 150);
        expect(novoSaldo).toBe(200);
      });
    });
  });
});
