# Angular 17.3: Projeto Prático com a Nova API de output()

Este projeto demonstra a nova API de `output()` introduzida no Angular 17.3, que substitui o uso de anotações (`@Output`) por funções de API. Essa mudança é impulsionada pelo conceito de signals, que está se tornando cada vez mais prevalente no Angular.

## Índice
- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Função output()](#função-output)
- [Função outputFromObservable()](#função-outputfromobservable)
- [Por Que output() é Melhor para Sua Aplicação?](#por-que-output-é-melhor-para-sua-aplicação)

## Visão Geral do Projeto

Este projeto prático ilustra como usar a nova API de `output()` no Angular 17.3. Em vez de usar o decorador `@Output`, agora usamos funções de API para declarar saídas em componentes. Isso está alinhado com o novo paradigma de signals no Angular, que visa simplificar e melhorar a consistência das APIs.

O projeto consiste em um componente filho que emite valores tanto usando a função `output()` quanto `outputFromObservable()`. O componente pai se inscreve nessas saídas e manipula os dados recebidos.

## Função output()

A função `output()` é usada para declarar uma saída em um componente Angular. Ela substitui o decorador `@Output`, proporcionando uma API mais simples e segura.

### Exemplo de Uso

```typescript
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  onNameChange = output<string>(); // OutputEmitterRef<string>

  updateName() {
    this.onNameChange.emit('teste');
  }
}
```

No componente pai, você pode se inscrever na saída usando a sintaxe de vinculação de eventos:

```typescript
    <app-child (onNameChange)="handleNameChange($event)"></app-child>
```

```typescript
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  handleNameChange(name: string) {
    console.log('Received from child:', name);
  }
}
```

### OutputFromObservable

A função outputFromObservable() permite declarar uma saída que emite valores baseados em um Observable do RxJS. Isso é particularmente útil para integrar fluxos de dados reativos diretamente como saídas de componentes.

### Exemplo de Uso

```typescript
import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  private nameChangeSubject = new Subject<string>();
  onNameChange$ = this.nameChangeSubject.asObservable();
  onNameChangeWithObservable = outputFromObservable(this.onNameChange$);

  fetchData() {
    this.nameChangeSubject.next('teste com observable');
  }
}

```

No componente pai, você pode se inscrever na saída onNameChangeWithObservable:

```typescript
<app-child (onNameChangeWithObservable)="handleNameChangeWithObservable($event)"></app-child>
```

```typescript
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  handleNameChangeWithObservable(name: string) {
    console.log('Received from child with observable:', name);
  }
}
```

### Por Que output() é Melhor para Sua Aplicação?

A nova API output() oferece vários benefícios em comparação com o decorador baseado em @Output:

- Alinhamento Conceitual com Novas APIs: A API output() está alinhada com outras APIs modernas do Angular, como entradas de signal, queries e funções model(). Isso torna a experiência de desenvolvimento mais coesa e intuitiva.

- Simplicidade e Remoção de Complexidade: A API simplifica o uso de saídas ao remover conceitos complexos e irrelevantes, como canais de erro e conclusão presentes no RxJS. Isso resulta em uma interface mais limpa e fácil de entender.

- Limpeza Automática: A nova API garante a limpeza automática das saídas quando a diretiva ou componente é destruído, reduzindo a probabilidade de vazamentos de memória.
Melhoria na Segurança de Tipos: A API output() melhora a segurança de tipos, garantindo que valores incorretos não sejam emitidos. Isso ajuda a evitar erros comuns de programação e comportamentos inesperados na aplicação.


### Conclusão

O Angular 17.3 introduz uma nova maneira de declarar saídas em componentes usando funções de API, em vez do decorador @Output. A função output() e outputFromObservable() proporcionam uma API mais simples, segura e alinhada com o conceito de signals, trazendo melhorias significativas para o desenvolvimento de aplicações Angular.

Experimente a nova API em seu projeto e aproveite os benefícios de uma interface mais limpa e intuitiva!