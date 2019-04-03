
```js
// src/renderers/dom/shared/ReactDOMComponent.js
function enqueuePutListener(inst, registrationName, listener, transaction) {
  if (transaction instanceof ReactServerRenderingTransaction) {
    return;
  }
  var containerInfo = inst._hostContainerInfo;
  var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE;
  var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
  listenTo(registrationName, doc); // 绑定事件!!!!!!!!
  // transaction.getReactMountReady().enqueue 就是把 putListener 函数加入了一个callback队列
  transaction.getReactMountReady().enqueue(putListener, { // 处理事件handler
    inst: inst,
    registrationName: registrationName,
    listener: listener,
  });
}
function putListener() {
  var listenerToPut = this;
  EventPluginHub.putListener(
    listenerToPut.inst,
    listenerToPut.registrationName,
    listenerToPut.listener
  );
}
```

```js
// src/renderers/shared/stack/event/EventPluginHub.js
var EventPluginHub = {
  /**
   * Stores `listener` at `listenerBank[registrationName][key]`. Is idempotent.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {function} listener The callback to store.
   */
  putListener: function(inst, registrationName, listener) {
    invariant(
      typeof listener === 'function',
      'Expected %s listener to be a function, instead got type %s',
      registrationName, typeof listener
    );

    var key = getDictionaryKey(inst);
    var bankForRegistrationName =
      listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[key] = listener;

    var PluginModule =
      EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.didPutListener) {
      PluginModule.didPutListener(inst, registrationName, listener);
    }
  },
}

```