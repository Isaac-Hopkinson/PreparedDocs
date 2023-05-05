---
title: "Assemble workflow blocks"
categorySlug: "retool-workflows"
parentDocSlug: "retool-workflows-guides"
excerpt: "Learn how to assemble blocks and functions to build workflows."
hidden: false
---
> 🎉 beta
>
> Retool Workflows is currently in public beta for Retool Cloud organizations. [Sign up to get started →](https://login.retool.com/auth/signup?redirect=workflows-new)

Workflows are made up of _blocks_ that are chained together to perform specific actions in sequential order, known as the [control flow](#control-flow). After a block has completed its action, it triggers the next block in the chain, and so on. [Functions](#functions) are reusable blocks that operate outside of the control flow and can be called when needed.

## Control flow

You connect blocks together to define their _control flow_, which represents the order of operation. Each block can access data from other blocks that have already run, and some blocks can be reused or perform conditional actions. You can connect a block to multiple blocks to perform multiple actions with data, resulting in multiple control flows that run in parallel. This is useful if you want to update multiple data sources with the same data.

![Control flow of a workflow](https://d3399nw8s4ngfo.cloudfront.net/docs/retool-workflows/c359e877-7f19-4c7a-b0f0-4db213553e61.webp)

### Start block

The _Start block_ is the first block in a workflow and cannot be removed. This block is where you configure settings to [trigger the workflow](https://docs.retool.com/docs/retool-workflows-triggers) and run it automatically.

![The Start block](https://d3399nw8s4ngfo.cloudfront.net/docs/retool-workflows/d7f0e0a1-44b9-4bdc-99ea-e71fd173dd83.webp)

## Add and connect blocks

There are two methods for adding and connecting blocks:

- Click and drag **⦿** from an existing block. This automatically creates a connection between blocks.
- Click **+** in the toolbar to add a block. You must then click-and-drag ⦿ from one block to another.

To connect blocks together, click and drag ⦿ from one block to another. The name of a connected block appears as a label on the left. Hover the cursor over this label to preview the incoming data. To disconnect a block, click and drag its label away from the block to which it's connected.

[block:html]
{
  "html": "<div style=\"position: relative; padding-bottom: calc(52.135416666666664% + 41px); height: 0;\"><iframe src=\"https://demo.arcade.software/4OIn11ztSHuKVDwuntvr?embed\" frameborder=\"0\" loading=\"lazy\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;\" title=\"Connect workflow blocks\"></iframe></div>"
}
[/block]

 Each block uses JavaScript to reference data from any block that has previously run. Use `query1.data` in JavaScript code and `{{ query1.data }}` elsewhere.

<!-- prettier-ignore-start -->

```javascript
return query1.data;
```
```sql
Select * from {{ query1.data }}
```

<!-- prettier-ignore-end -->

Any blocks that are not in the control flow (i.e., no connecting line) are not run automatically and display a warning if they are not connected.

### Resource query

> 📘
>
> Learn more about Retool's [supported integrations](https://retool.com/integrations/) and how to [connect your own data sources](https://docs.retool.com/docs/resources).

Use _Resource query_ blocks to interact with resources and work with your data. You can use SQL to interact with databases and perform API requests.

Database resources use SQL queries. You use **SQL mode** to [write SQL statements](https://docs.retool.com/docs/sql-queries), primarily used for reading data. **GUI mode** provides you with an interface to [construct queries that write or modify data](https://docs.retool.com/docs/sql-writes) with greater accuracy than a raw SQL statement. This can prevent unintentional changes due to erroneous SQL statements.

[block:html]
{
  "html": "<div style=\"position: relative; padding-bottom: calc(50.83333333333333% + 41px); height: 0;\"><iframe src=\"https://demo.arcade.software/I88YWlYVqIGXGBpPLuvC?embed\" frameborder=\"0\" loading=\"lazy\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;\" title=\"Resource queries with SQL\"></iframe></div>"
}
[/block]

API resources, such as [REST](https://docs.retool.com/docs/connect-api-resource), [GraphQL](https://docs.retool.com/docs/graphql), and [SOAP](https://docs.retool.com/docs/connect-api-resource) APIs, also use a GUI to construct queries. You can also use the **RESTQuery** resource to manually interact with APIs that are not configured as an existing resource.

![Query JSON with SQL](https://d3399nw8s4ngfo.cloudfront.net/docs/retool-workflows/b49c7cd2-3c85-4492-b033-3fce76d1b67c.webp)

### Code

_Code_ blocks enable you to write JavaScript or Python to transform data, perform complex logic, and extend the functionality of workflows.

#### JavaScript

> 📘
> Retool also includes support for popular [JavaScript libraries](/docs/retool-workflows-libraries) for use in workflows.

[JavaScript](https://docs.retool.com/docs/javascript-overview) is the primary method for manipulating and transforming data in Retool. Select **JavaScript** to write JavaScript code.

You can build complex logic or manipulate data using JavaScript methods like `map()`. For example, you could transform an array of account records so to combine separate first and last name values.

```javascript Map
const data = query2.data;

return data.map((customer) => ({
  fullName: customer.first + " " + customer.last,
  emailAddress: customer.email,
}));
```

[block:html]
{
  "html": "<div style=\"position: relative; padding-bottom: calc(50.83333333333333% + 41px); height: 0;\"><iframe src=\"https://demo.arcade.software/6ABpkor3Sfhf8YYtws6X?embed\" frameborder=\"0\" loading=\"lazy\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;\" title=\"JavaScript Code block\"></iframe></div>"
}
[/block]

In general, Retool recommends you visually construct conditional statements with [Branch blocks](#branch) or filter query results using [Filter blocks](#filter).

JavaScript Code blocks can also call [functions](#functions)—reusable blocks that operate outside the workflow control flow. Functions allow your workflow to perform actions only when required and can receive parameters to use.

#### Python

Select **Python** to write Python code that executes in the workflow. Python Code blocks work with input data, perform advanced actions, and then output JSON-serialized data.

The Python code editor has much of the same features as the JavaScript editor, such as autocomplete and syntax highlighting. If you're more familiar with Python, you can use it instead of JavaScript to manipulate data. For example, you can transform an array of records in a similar manner to `map()` with JavaScript:

```python
data = query2.data
return [{
   "fullName": customer['first'] + ' ' + customer['last'],
   "emailAddress": customer['email']
} for customer in data]
```

[block:html]
{
  "html": "<div style=\"position: relative; padding-bottom: calc(50.83333333333333% + 41px); height: 0;\"><iframe src=\"https://demo.arcade.software/0Ew79cubuMlHb7zWDKFD?embed\" frameborder=\"0\" loading=\"lazy\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;\" title=\"Python Code block\"></iframe></div>"
}
[/block]

#### Python workflow limitations

To maintain interoperability with other blocks, Python does not currently support:

- Function block calls or triggering queries.
- Usage within Loop and Filter blocks.
- Data output in types other than serialized JSON.
- User-imported Python libraries.

#### Available Python libraries

Python queries include built-in support for many popular libraries. This enables you to extend the functionality of workflows beyond data transformation. Available libraries include:

- [numpy](https://pypi.org/project/numpy/)
- [bson](https://pypi.org/project/bson/)
- [pandas](https://pypi.org/project/pandas/)
- [scipy](https://pypi.org/project/scipy/)
- [python-pdf](https://pypi.org/project/python-pdf/)
- [charset-normalizer](https://pypi.org/project/charset-normalizer/)
- [python-dateutil](https://pypi.org/project/python-dateutil/)
- [cryptography](https://pypi.org/project/cryptography/)
- [pyyaml](https://pypi.org/project/pyyaml/)
- [pytz](https://pypi.org/project/pytz/)
- [rsa](https://pypi.org/project/rsa/)
- [protobuf](https://pypi.org/project/protobuf/)
- [pillow](https://pypi.org/project/pillow/)
- [packaging](https://pypi.org/project/packaging/)
- [jinja2](https://pypi.org/project/jinja2/)
- [markupsafe](https://pypi.org/project/markupsafe/)
- [async-timeout](https://pypi.org/project/async-timeout/)
- [beautifulsoup4](https://pypi.org/project/beautifulsoup4/)
- [openai](https://pypi.org/project/openai/)
- [requests](https://pypi.org/project/requests/)
- [Asyncio](https://pypi.org/project/Asyncio/)
- [matplotlib](https://pypi.org/project/matplotlib/)
- [seaborn](https://pypi.org/project/seaborn/)

### Smart

> 🚧
>
> Any data you pass to a Smart block is sent to and processed by [OpenAI](https://openai.com/).

_Smart_ blocks provide built-in support for Open AI's [ChatGPT models](https://platform.openai.com/docs/models). You can write instructions and select the model to use, with results returned back to the workflow. You can include workflow data using `{{ }}` within the block.

[block:html]
{
  "html": "<div style=\"position: relative; padding-bottom: calc(52.09756097560976% + 41px); height: 0;\"><iframe src=\"https://demo.arcade.software/8I4LEVhtDzv84npfUYHu?embed\" frameborder=\"0\" loading=\"lazy\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;\" title=\"Smart block\"></iframe></div>"
}
[/block]

This allows you to build AI-powered workflows that can perform sentiment analysis, categorization, summarization, and more. For example, ChatGPT can take a list of countries and identify which continent they are in, then return the results.

```text Query
Data: {{ query2.data }}

Instruction: What continent is each country in?
```
```json Response
{
  "data": "Vatican City: Europe\nTurkey: Asia\nArgentina: South America\nSpain: Europe\nItaly: Europe\nGreece: Europe\nChina: Asia\nRussia: Europe/Asia\nCzech Republic: Europe\nChile: South America\nUSA: North America\nFrance: Europe\nUnited Kingdom: Europe\nNetherlands: Europe\nMalaysia: Asia\nGermany: Europe\nJapan: Asia\nCanada: North America\nThailand: Asia",
  "metadata": null
}
```

While ChatGPT can be highly effective, AI-generated results can be inaccurate at times. You should review all responses to ensure they are accurate.

### Filter

> 🚧
>
> Optimize your queries to filter data and return only the results you need first (e.g., use `LIMIT` or `WHERE` clauses).

If you need a workflow to perform actions with only a specific subset of data, use _Filter_ blocks to return results only if they meet certain conditions. If an item evaluates as `true`, the Filter block includes it in the data it returns.

Filter blocks function similar to [Loop blocks](#loop-blocks) and iterate through the query you select from the **Iterable** dropdown. Set the **Filter Expression** to a condition that should evaluate as `true`, using `value` and `index` to reference evaluated items and their indexes.

[block:html]
{
  "html": "<div style=\"position: relative; padding-bottom: calc(52.09756097560976% + 41px); height: 0;\"><iframe src=\"https://demo.arcade.software/ivYorMSpt1LEIKcnTsmo?embed\" frameborder=\"0\" loading=\"lazy\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;\" title=\"Filter block\"></iframe></div>"
}
[/block]

For example, you can use a Filter block to return a list of customers who are outside the United States with `value.country != 'USA`.

### Branch

Instead of writing [if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statements in JavaScript, you can use _Branch_ blocks to visually build conditional statements that control different connected blocks. This is useful for breaking out complex JavaScript logic into more manageable blocks.

A Branch block evaluates the data it receives from a connected block using the defined condition. If the condition evaluates as a <<glossary:truthy value>>, the workflow follows the control flow for the **If** statement. If not, it follows the control flow for the **Else** statement.

For example, you could build a workflow that alerts your shipping department if the number of international customers exceeds a certain threshold, such as `query2.data.length > 90`.

[block:html]
{
  "html": "<div style=\"position: relative; padding-bottom: calc(52.09756097560976% + 41px); height: 0;\"><iframe src=\"https://demo.arcade.software/9WdfPAWEwOwrfc3n7PH3?embed\" frameborder=\"0\" loading=\"lazy\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;\" title=\"Branch blocks\"></iframe></div>"
}
[/block]

You can add multiple branches as **Else if** statements and visually build out complex conditional logic. As you test your workflow, the condition that evaluates as `true` is highlighted in green.

Each conditional statement has its own connector so you can connect different blocks and define separate control flows for each outcome.

### Loop

_Loop_ blocks are useful for automating repetitive actions or performing complex logic on an array of data. A Loop block contains an embedded block that triggers for each evaluated item. This embedded block can query a resource each time or run JavaScript—select either a resource or **Run JS Code**.

Use `value` and `index` to reference evaluated items and their indexes. For example, you can automate emails sent to a list of customers, and customize the message for each recipient, using values like `{{ value.email }}`, `{{ value.first }}`, and `{{ value.last }}`.

[block:html]
{
  "html": "<div style=\"position: relative; padding-bottom: calc(52.135416666666664% + 41px); height: 0;\"><iframe src=\"https://demo.arcade.software/uQnE3CfAKeT5oSUmin7y?embed\" frameborder=\"0\" loading=\"lazy\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;\" title=\"Loop blocks\"></iframe></div>"
}
[/block]

The default mode for Loop blocks is **GUI**. This mode automatically configures the loop to iterate through the query data you select from the **Iterable** dropdown. If you require more complexity with your loop logic, use **Code**. This  allows you to configure the JavaScript code used by the Loop block. You must specify the query data through which to loop within the custom code.

![Loop through data and trigger query with custom code](https://d3399nw8s4ngfo.cloudfront.net/docs/retool-workflows/baccc133-48b6-4f0b-9fbc-ed40dee3cb9a.webp)

### Response

The _Response_ block works in conjunction with the [Webhook trigger](/docs/retool-workflows-blocks#trigger-workflows-with-webhooks) and enables you to configure your own webhook responses. By default, webhook-triggered workflows without a Response block immediately return a standard response. When a Response block is in use, the workflow responds only when the workflow reaches the block in the control flow.

You can specify the HTTP **status code** and a JSON **response body** to return, which can include any data from the workflow. For example, you could use a workflow to look up a customer's mailing address based on their email, which is returned in the webhook response.

[block:html]
{
  "html": "<div style=\"position: relative; padding-bottom: calc(52.09756097560976% + 41px); height: 0;\"><iframe src=\"https://demo.arcade.software/65nf9Fzl8MA6EwKqNOrI?embed\" frameborder=\"0\" loading=\"lazy\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;\" title=\"Response block\"></iframe></div>"
}
[/block]

Retool recommends you configure Response blocks to handle both successful and failed requests. This allows the sender to know if the workflow succeeded or if there was a problem, such as incorrect data or no results.

## Duplicate a block

Click **⫶** and select **Duplicate** to create a copy of an existing block.

![Duplicate a block](https://d3399nw8s4ngfo.cloudfront.net/docs/retool-workflows/d7b8298f-6e75-4991-a6d7-49f957972d5d.webp)

## Functions

_Functions_ are reusable blocks that run queries in a headless state. They operate outside of the control flow and do not appear on the canvas. You call Function blocks from JavaScript queries and can pass data as parameters. This reduces the need for query duplication and enables you to perform certain tasks only when necessary, not for every workflow run.

![Create a function](https://d3399nw8s4ngfo.cloudfront.net/docs/retool-workflows/25160b5e-7c5b-4986-8751-c72f45f2066a.webp)

To create a Function block, click **+** in the **Functions** section of the left panel. You can configure optional parameters for each block that you can reference within the block itself. Each parameter must have a test value so it can perform a test run without being called.

You can also create Function blocks directly from a block's code editor. Type `/` on a new line and enter the name of a resource, then press **Enter**. You can also reference an existing function in the same way by entering the name of an existing function.

> 📘
>
> The resource name refers to the name used by your Retool organization (e.g., **onboarding_db**), not the name of the service used (e.g., PostgreSQL).

You call a Function block using `await` and include values for each parameter, if set. For example:

```javascript
const subs = getExpiringSubscriptions.data;
const message =
  workflowContext.name +
  ": You have " +
  subs.length +
  " subscription(s) expiring this week!";

await sendMessage(message);
```

![Call a function](https://d3399nw8s4ngfo.cloudfront.net/docs/retool-workflows/b79d9908-e214-4945-9c69-699bfc6f00d4.webp)

The Function block returns its output back to the block from which it was called, allowing it to be used in the rest of the workflow.

## Configure block settings

You can configure a number of settings for blocks. The settings available depend on the type of block and resource currently in use. Click **⫶** in a block to open its settings menu.

Available settings include:

- Use the block as an [error handler](https://docs.retool.com/docs/retool-workflows-error-handling-and-debugging#error-handlers).
- Format code syntax. You can also press <span class="sck key_Ctrl">Ctrl</span> <span class="sck key">L</span> to format code.
- Switch SQL queries between raw SQL and <<glossary:GUI mode>>.
- Set a timeout (in ms). Blocks can have a maximum timeout of two minutes (`120000`).
- Duplicate or delete a block.

## Block notes

You can add comments to a block that can be helpful to explain its function and leave notes for other users. Click the **Notes** button in a block and write a comment. [Markdown formatting](https://docs.retool.com/docs/retool-markdown-html-reference) is supported.

![Write block notes](https://d3399nw8s4ngfo.cloudfront.net/docs/retool-workflows/cc2af97a-c5e2-43a9-a7f0-b68c3bd9a325.webp)