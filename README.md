📊 Sistema de Gerenciamento Pessoal

> Uma aplicação web completa para organizar tarefas e controlar gastos pessoais de forma simples e eficiente.

 🎯 Sobre o Projeto

Esta aplicação resolve um problema comum: **como organizar tarefas e gastos em um só lugar**. Desenvolvida com foco na usabilidade e persistência de dados, oferece uma interface intuitiva para gerenciar aspectos importantes do dia a dia.

✨ Funcionalidades

📋 Gerenciador de Tarefas
- ✅ **Adicionar tarefas** com título e categoria
- ✅ **Marcar como concluída** ou retornar para pendente
- ✅ **Excluir tarefas** desnecessárias
- ✅ **Filtrar por status** (todas, pendentes, concluídas)
- ✅ **Filtrar por categoria** (pessoal, trabalho, estudos, saúde)
- ✅ **Timestamp automático** de criação

 💰 Controle Financeiro
- ✅ **Registrar gastos** com descrição, valor e categoria
- ✅ **Cálculo automático** do total de gastos
- ✅ **Contador de registros** em tempo real
- ✅ **Exclusão de gastos** individuais
- ✅ **Categorização** (alimentação, transporte, saúde, lazer, estudos, outros)

 💾 Persistência de Dados
- ✅ **LocalStorage** - dados salvos no navegador
- ✅ **Carregamento automático** ao abrir a aplicação
- ✅ **Sincronização em tempo real** entre interface e armazenamento

 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica da aplicação
- **CSS3** - Design responsivo com gradientes e animações
- **JavaScript ES6+** - Lógica da aplicação e manipulação do DOM
- **Font Awesome** - Iconografia moderna
- **LocalStorage API** - Persistência de dados local

 🎨 Design e UX

- **Interface Moderna** - Gradientes e efeitos glassmorphism
- **Responsivo** - Funciona perfeitamente em desktop e mobile
- **Estados Vazios** - Orientação quando não há dados
- **Feedback Visual** - Animações e transições suaves
- **Categorização Visual** - Cores e ícones para diferentes tipos
 📱 Como Executar

 Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

 Passos
1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/sistema-gerenciamento-pessoal.git
   ```

2. **Entre na pasta do projeto**
   ```bash
   cd sistema-gerenciamento-pessoal
   ```

3. **Abra o arquivo principal**
   - Abra o arquivo `index.html` em qualquer navegador
   - Ou use um servidor local como Live Server no VS Code

📂 Estrutura do Projeto

```
sistema-gerenciamento-pessoal/
├── index.html          # Estrutura principal da aplicação
├── style.css           # Estilos e responsividade
├── script.js           # Lógica JavaScript e funcionalidades
├── README.md           # Documentação do projeto
└── screenshots/        # Capturas de tela (opcional)
```

 💡 Conceitos JavaScript Aplicados

- **Arrays e Objetos** - Estruturas de dados para organizar informações
- **Local Storage** - Persistência de dados no navegador
- **DOM Manipulation** - Criação e modificação dinâmica de elementos
- **Event Listeners** - Captura de eventos do usuário
- **Array Methods** - filter(), find(), reduce(), map(), sort()
- **ES6+ Features** - template literals, arrow functions, destructuring
- **Form Validation** - Validação de dados do usuário
- **Dynamic Rendering** - Atualização automática da interface

 🚀 Funcionalidades Técnicas Destacadas

 Gerenciamento de Estado
```javascript
// Estruturas de dados organizadas
let tasks = [];
let expenses = [];

// Persistência automática
function saveData() {
    localStorage.setItem('personalTasks', JSON.stringify(tasks));
    localStorage.setItem('personalExpenses', JSON.stringify(expenses));
}
```

 Filtros Dinâmicos
```javascript
// Filtros combinados para tarefas
let filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || 
                        (statusFilter === 'completed' && task.completed) ||
                        (statusFilter === 'pending' && !task.completed);
    const matchesCategory = catFilter === 'all' || task.category === catFilter;
    return matchesStatus && matchesCategory;
});
```

 Cálculos Financeiros
```javascript
// Resumo automático com reduce()
const total = expenses.reduce((sum, expense) => sum + expense.value, 0);
```

 🎯 Próximas Melhorias

- [ ] **Gráficos** - Visualização de gastos por categoria
- [ ] **Exportar dados** - Download em JSON/CSV
- [ ] **Temas** - Modo escuro/claro
- [ ] **Backup na nuvem** - Sincronização entre dispositivos
- [ ] **Relatórios** - Análises de produtividade e gastos
- [ ] **Notificações** - Lembretes de tarefas pendentes

🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

👨‍💻 Desenvolvedor

**Leonardo Cardoso Silva**
- GitHub: [@Leoon23](https://github.com/Leoon23)
- LinkedIn: [Leonardo Silva Cardoso](https://linkedin.com/in/leonardosilva-cardoso)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
