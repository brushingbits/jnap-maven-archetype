Ext.ns('Ext.ux.jnap');

/**
 * @class Ext.ux.jnap.CTemplate
 * @extends Ext.XTemplate
 */
Ext.ux.jnap.CTemplate = Ext.extend(Ext.XTemplate, {

	components : [],

	constructor : function(args) {
		Ext.ux.jnap.CTemplate.superclass.constructor.apply(this, [ args ]);
		this.init();
	},

	init : function() {

	}
});

Ext.ns('Ext.ux.jnap');
/**
 * @class Ext.ux.jnap.ComponentDataView
 * @extends Ext.DataView
 */
Ext.ux.jnap.ComponentDataView = Ext.extend(Ext.DataView, {
});

Ext.reg('cdataview', Ext.ux.jnap.ComponentDataView);
Ext.ns('Ext.ux.jnap');

Ext.ux.jnap.ComponentUtils = function() {

	return {

		hideParent : function(btn, evt, parentType) {
			var parent = btn.findParentByType(parentType);
			if (!parent) {
				throw String.format('The button {0} has no parent of type {1}.', btn.id, parentType);
			}
			parent.hide();
		},

		hideWindow : function(btn, evt) {
			Ext.ux.jnap.ComponentUtils.hideParent(btn, evt, Ext.Window);
		}

	};

}();

/**
 * @class Ext.ux.jnap.ExceptionDialog
 * @singleton
 */
Ext.ux.jnap.ExceptionDialog = function() {

	var dialog, panel, reportBtn;

	var getDialog = function() {
		if (!dialog) {
			dialog = new Ext.Window({
				
			});
		}
		return dialog;
	};

	var getPanel = function() {
		if (!panel) {
			panel = new Ext.Panel({
				
			});
		}
		return panel;
	};

	var getReportButton = function() {
		if (!reportBtn) {
			reportBtn = new Ext.Button({
				
			});
		}
		return reportBtn;
	};

	var lastReportHandler = null;

	return {

		defaultTitle : 'An unexpected exception was thrown.',

		show : function(exceptionObj, opts) {
			opts = opts || {};
			var panel = getPanel();
			var btn = getReportButton();
			if (Ext.isDefined(opts.reportHandler)) {
				lastReportHandler = opts.reportHandler;
				btn.on('click', lastReportHandler);
				panel.add(btn);
			} else {
				if (panel.findById(btn.id)) {
					if (lastReportHandler) {
						btn.un('click', lastReportHandler);
					}
					panel.remove(btn);
				} 
			}

			// update content

			// show dialog
			getWindow().show();
		}
	};

}();


/**
 * @class Ext.ux.jnap.NotificationMessage
 * @extends Ext.BoxComponent
 */
Ext.ux.jnap.FloatingActions = Ext.extend(Ext.BoxComponent, {

	actions : [],

	// private
	initComponent : function() {
		Ext.ux.jnap.NotificationMessage.superclass.initComponent.call(this);
		this.addEvents();
	},

	onRender : function() {
		
	}
});

Ext.ns('Ext.ux.jnap');

/**
 * @class Ext.ux.jnap.Rating
 * @extends Ext.BoxComponent
 */
Ext.ux.jnap.ImageBox = Ext.extend(Ext.util.Observable, {

	mode : 'single',

	imageSelector : '.image-box'
});
Ext.ux.jnap.LinkButton = Ext.extend(Ext.Button, {

	baseCls : 'ux-link-button',

	buttonSelector : 'a:first-child',

	href : null,

	target : null,

	template : new Ext.Template([
		'<div id="{2}" class="{1}">',
			'<a href="{0}">{3}</a>',
		'</div>'
	], { compiled : true }),

	getTemplateArgs : function() {
		return [ this.href, this.baseCls, this.id, this.text ];
	},

	onClick : function(e) {
		if (e.button != 0) {
			return;
		}
		if (!this.disabled) {
			this.fireEvent("click", this, e);
			if (this.handler) {
				this.handler.call(this.scope || this, this, e);
			}
		}
	},

	enable : function() {
		this.el.removeClass(this.baseCls + '-disable');
	},

	disable : function() {
		this.el.addClass(this.baseCls + '-disable');
	}

});

Ext.reg('linkbutton', Ext.ux.jnap.LinkButton);
Ext.ns('Ext.ux.jnap');

/**
 * @class Ext.ux.jnap.NavigationBar
 * @extends Ext.BoxComponent
 */
Ext.ux.jnap.NavigationBar = Ext.extend(Ext.BoxComponent, {
	
});

Ext.ns('Ext.ux.jnap');

/**
 * @class Ext.ux.jnap.NotificationMessageType
 * @singleton
 * <p>An <code>Enum</code> type class representing the notification message built-in types. You
 * can add your own constants to this class like this:</p>
 * <p>
 * <code>
 * Ext.apply(Ext.ux.jnap.NotificationMessageType, {
 *     MY_TYPE : 'mytype'
 * });
 * </code>
 * </p>
 */
Ext.ux.jnap.NotificationMessageType = {

	/**
	 * A constant that...
	 */
	INFO : 'info',
	
	/**
	 * A constant that...
	 */
	WARNING : 'warning',

	/**
	 * A constant that...
	 */
	ERROR : 'error',

	/**
	 * A constant that...
	 */
	SUCCESS : 'success',

	/**
	 * A constant that...
	 */
	CLEAR : 'clear',

	/**
	 * A constant that...
	 */
	CLEAR_DARK : 'dark'
};

/**
 * @class Ext.ux.jnap.NotificationMessage
 * @extends Ext.BoxComponent
 */
Ext.ux.jnap.NotificationMessage = Ext.extend(Ext.BoxComponent, {

	/**
	 * @cfg {Boolean} animateOnShow
	 */
	animateOnShow : true,

	/**
	 * @cfg {Boolean} animateOnShow
	 */
	animateOnHide : true,

	/**
	 * @cfg {String} baseCls
	 * The base CSS class to apply to the message box element (defaults to 'x-notification-msg')
	 */
	baseCls : 'x-notification-msg',

	/**
	 * @cfg {String} extraCls
	 * An extra CSS class to apply to the message box element (defaults to undefined)
	 */
	extraCls : undefined,
	
	/**
	 * @cfg {Boolean} closeable
	 */
	closeable : false,
	
	/**
	 * @cfg {String} closeTitle
	 */
	closeTitle : 'Dismiss message',

	/**
	 * @cfg {Boolean} destroyOnHide
	 */
	destroyOnHide : true,

	/**
	 * @cfg {Number} dismissDelay Delay in milliseconds before the message box automatically 
	 * hides. To disable automatic hiding, set dismissDelay = 0 (this is the default value).
	 */
	dismissDelay : 0,

	/**
	 * @cfg {String} icon
	 */
	icon : undefined,

	/**
	 * @cfg {String} iconCls
	 */
	iconCls : undefined,

	/**
	 * @cfg {String} msg
	 */
	msg : '',

	shadow : false,
	
	/**
	 * @cfg {String} title
	 */
	title : null,

	/**
	 * @cfg {String} type
	 */
	type : Ext.ux.jnap.NotificationMessageType.CLEAR,

	// private
	initComponent : function() {
		Ext.ux.jnap.NotificationMessage.superclass.initComponent.call(this);
		this.addEvents(
			'msgupdate',
			'titleupdate'
		);
	},

	// private
	onRender : function(ct, position) {
		// define tpl if not yet
		if (!this.tpl) {
			this.tpl = new Ext.XTemplate(
				'<div class="{cls} {cls}-{type}">',
				'<tpl if="closeable">',
				'<input class="{cls}-close" type="image" value="" />',
				'</tpl>',
				'<span class="{cls}-icon"></span>',
				'<div class="{cls}-content">',
				'<tpl if="hasTitle"><h3 class="{cls}-title">{title}</h3></tpl>',
				'{msg}</div>',
				'</div>', {
					compiled: true,
					disableFormats: true
				}
			);
		}
		this.el = position
				? this.tpl.insertBefore(position, this._getTplArgs(), true)
				: this.tpl.append(ct, this._getTplArgs(), true);
		this.el.setVisibilityMode(Ext.Element.DISPLAY);
		if (this.shadow) {
			this.el.addClass('shadow');
		}
		if (this.extraCls) {
			this.el.addClass(this.extraCls);
		}
		if (this.id) {
			this.el.dom.id = this.id;
		}

		if (this.title) {
			this._titleEl = this.el.first('h3');
		}
		this._msgEl = this.el.first('div.' + this.baseCls + '-content');
		if (this.closeable) {
			this._closeEl = this.el.first('input.' + this.baseCls + '-close');
			this._configCloseEl();
		}

		// schedule auto dismiss
		if (!this.hidden) {
			this._doAfterShow();
		}
	},

	setMsg : function(msg) {
		this.msg = msg;
		if (this.rendered) {
			this._msgEl.update(this.msg);
			this.fireEvent('msgupdate', this, this.msg);
		}
		return this;
	},

	setTitle : function(title) {
		this.title = title;
		if (this.rendered) {
			if (title != null) {
				if (!this._titleEl) {
					this._titleEl = this.el.insertFirst({
						tag: 'h3',
						cls: this.baseCls + '-title'
					});
				}
				this._titleEl.update(this.title);
			} else if (this._titleEl) {
				this._titleEl.remove();
				delete this._titleEl;
			}
			this.fireEvent('titleupdate', this, this.title);
		}
		return this;
	},

	setType : function(type) {
		this.el.removeClass(this.type);
		this.el.addClass(type);
		this.type = type;
	},

	setCloseable : function(closeable) {
		// if its closeable and the close element doesnt exists, then create it
		if (closeable && !this._closeEl) {
			this._closeEl = this.el.append({
				tag: 'input',
				type : 'image',
				cls: this.baseCls + '-close'
			});
			this._configCloseEl();
		}
		// if its not closeable and the element exists, remove it
		if (!closeable && this._closeEl) {
			this._removeCloseEl();
		}
		this.closeable = closeable;
	},

	update : function(htmlOrConfig) {
		if (Ext.isString(htmlOrConfig)) {
			this.setMsg(htmlOrConfig);
		} else if (Ext.isObject(htmlOrConfig)) {
			if (htmlOrConfig.msg) {
				this.setMsg(htmlOrConfig.msg);
			}
			if (htmlOrConfig.title) {
				this.setTitle(htmlOrConfig.title);
			}
			if (htmlOrConfig.type) {
				this.setType(htmlOrConfig.type);
			}
		}
	},

	onHide : function() {
		var me = this.el;
		if (!me) {
			this._hideAlreadyTriggered = true;
			return false;
		}
		if (this._dismissTimer) {
			window.clearTimeout(this._dismissTimer);
		}
		me.stopFx();
		if (this.animateOnHide) {
			me.ghost('t', {
				useDisplay : true,
				callback : this._doOnHide.createDelegate(this)
			});
		} else {
			me.setVisible(false);
			this._doOnHide();
		}
	},

	onShow : function() {
		if (this.animateOnShow) {
			this.el.syncFx();
			this.el.slideIn('t', {
				easing : 'easeNone',
				duration : 0.3,
				concurrent : true
			}).fadeIn({
				duration : 0.8,
				concurrent : true,
				endOpacity : 0.9,
				scope : this,
				callback : this._doAfterShow.createDelegate(this)
			});
		} else {
			this.el.setVisible(true);
			this._doAfterShow();
		}
	},

	onDestroy : function() {
		if (this.rendered) {
			this._removeCloseEl();
			Ext.destroyMembers(this, '_textEl', '_titleEl');
		}
		if (this._dismissTimer) {
			window.clearTimeout(this._dismissTimer);
		}
		Ext.ux.jnap.NotificationMessage.superclass.onDestroy.call(this);
	},

	// private
	_getTplArgs : function() {
		return {
			cls : this.baseCls,
			type : this.type,
			hasTitle : this.title != null && this.title.trim() > 0,
			title : this.title,
			msg : this.msg,
			closeable : this.closeable
		};
	},

	// private
	_doOnHide : function() {
		if (this._closeElTooTip) {
			this._closeElTooTip.hide();
		}
		if (this.destroyOnHide) {
			this.destroy();
		}
	},

	// private
	_doAfterShow : function() {
		if (this.dismissDelay) {
			window.clearTimeout(this._dismissTimer);
			this._dismissTimer = this.hide.defer(this.dismissDelay, this);
		}
	},

	// private
	_configCloseEl : function() {
		if (this._closeEl) {
			this._closeEl.addClassOnOver(this.baseCls + '-close-hover');
			this.mon(this._closeEl, 'click', function(evt, el, obj) {
				this.hide();
			}, this);
			this._closeElTooTip = new Ext.ToolTip({
				target: this._closeEl,
				html: this.closeTitle
			});
		}
	},

	// private
	_removeCloseEl : function() {
		if (this._closeEl) {
			this._closeEl.remove();
			delete this._closeEl;
		}
		if (this._closeElToolTip) {
			this._closeElToolTip.destroy();
			delete this._closeElToolTip;
		}
	}

});
Ext.reg('notificationmsg', Ext.ux.jnap.NotificationMessage);

/**
 * @class Ext.ux.jnap.NotificationMessagePlugin
 * @extends Object
 * A plugin that adds a notification message ({@link Ext.ux.jnap.NotificationMessage}) as a behavior
 * of the plugin container. The method {@link #showNotificationMsg} is injected on the container and
 * ... TODO
 */
Ext.ux.jnap.NotificationMessagePlugin = Ext.extend(Object, {

	/**
	 * @cfg {Object} defaults
	 * An object representing the {@link Ext.ux.jnap.NotificationMessage} default config options
	 * for this plugin. Defaults to <code>{}</code>.
	 */
	defaults : {},

	/**
	 * @cfg {String} targetSelector
	 * <p>A string representing a selector (see {@link Ext.DomQuery}) that will be used to select
	 * the element which will be the container for the notification message. If <code>undefined</code>
	 * the <code>container.el</code> will be used (where <code>container</code> is the component 
	 * that the plugin was added to). Defaults to <code>'div.{baseCls}-body'</code>.</p>
	 * <p>Note: you can use the container's config options as template variables.</p>
	 */
	targetSelector : 'div.{baseCls}-body',

	/**
	 * @cfg {String|Number} width
	 * The width of the message's container relative to it's parent container (defined by
	 * {@link #targetSelector}). You can use a String (like the CSS width property) or a
	 * Number (then the default unit will be used). Defaults to <code>'98%'</code>.
	 */
	width : '98%',

	/**
	 * @cfg {Array} positionOffset
	 */
	positionOffset : [0, -6],

	constructor : function(config) {
		config = config || {};
		Ext.apply(this, config);
	},

	// private
	init : function(container) {
		if (!container instanceof Ext.Container) {
			return false;
		}
		this.container = container;
		this.container.afterRender = this.container.afterRender.createSequence(this.afterRender, this);
	},

	// private
	afterRender : function() {
		this._containerEl = this.container.el;
		if (this.targetSelector) {
			this._containerEl = this.container.el.child(
					new Ext.Template(this.targetSelector).apply(this.container));
		}
		this.container.showNotificationMsg = this.showNotificationMsg.createDelegate(this);
	},

	/**
	 * This method will display the notification message using the provided configuration. It'll
	 * be injected on the container itself, so you must call it directly from the component instance
	 * you've added the plugin.
	 * 
	 * @param {String|Object} msg A {@link Ext.ux.jnap.NotificationMessage} config object or a
	 * <code>String</code> representing the {@link Ext.ux.jnap.NotificationMessage#msg}.
	 */
	showNotificationMsg : function(msg) {
		if (Ext.isString(msg)) {
			msg = {
				msg : msg
			};
		}
		Ext.applyIf(msg, this.defaults);
		var justCreated = false;
		if (!this.msg) {
			// the NotificationMessage on this plugin will be unique and always reused
			// so force destroyOnHide = false
			Ext.apply(msg, {
				destroyOnHide : false
			});
			this.msg = new Ext.ux.jnap.NotificationMessage(msg);
			justCreated = true;
		}
		if (!justCreated) {
			this.msg.update(msg);
		}
		Ext.ux.jnap.NotificationMgr.notify({
			msg : this.msg,
			position : Ext.ux.jnap.NotificationMgr.TARGET_TOP_CENTER,
			positionOffset : this.positionOffset,
			target : this._containerEl,
			width : this.width
		});
	}

});
Ext.preg('notificationmsg', Ext.ux.jnap.NotificationMessagePlugin);
/**
 * @class Ext.ux.jnap.NotificationMgr
 * @singleton
 */
Ext.ux.jnap.NotificationMgr = function() {

	var _targets = new Ext.util.MixedCollection();

	var _createNotificationContainer = function(target) {
		return target.createChild({
			tag : 'div',
			cls : 'x-notification-msg-container'
		});
	};

	// ajax loading message support objects
	var _currentAjaxLoadingMsg = null;
	var _ajaxLoadingMsgOwner = new Array();
	var _shouldShowLoadingMsg = true;

	// singleton object
	return {

		TARGET_TOP_LEFT : 'tl-tl',

		TARGET_TOP_CENTER : 't-t',

		TARGET_TOP_RIGHT : 'tl-tr',
		
		TARGET_BOTTOM_LEFT : 'bl-bl',
		
		TARGET_BOTTOM_CENTER : 'b-b',
		
		TARGET_BOTTOM_RIGHT : 'br-br',

		/**
		 * 
		 * @param target
		 * @param msg
		 * @return {Ext.ux.jnap.NotificationMessage}
		 */
		notify : function(config) {
			config = config || {};
			Ext.applyIf(config, {
				msg : {},
				width : 350,
				position : Ext.ux.jnap.NotificationMgr.TARGET_TOP_CENTER,
				positionOffset : [0, 0],
				target : Ext.getBody()
			});
			var pos = config.position;
			var target = config.target;
			target.id = target.id || Ext.id(target);
			var targetId = target.id;
			if (target == Ext.getBody()) {
				targetId += '-' + config.position;
			}
			var targetCont = _targets.get(targetId);
			if (!targetCont) {
				targetCont = config.container || _createNotificationContainer(target);
				_targets.add(targetId, targetCont);
			}
			var msg = config.msg;
			if (!(msg instanceof Ext.ux.jnap.NotificationMessage)) {
				Ext.applyIf(msg, { xtype : 'notificationmsg' });
				msg = Ext.create(msg);
			}
			// configure initial width
			targetCont.setWidth(config.width);
			if (!msg.rendered) {
				msg.render(targetCont);
			}
			// adjust width if message's width is greater than container's
			if (msg.getWidth() && targetCont.getWidth() < msg.getWidth()) {
				targetCont.setWidth(msg.getWidth());
			}
			msg.show();
			targetCont.anchorTo(target, config.position, config.positionOffset, false, true);
			return msg;
		},

		/**
		 * 
		 */
		defaultAjaxLoadingMsgText : 'Please wait, loading...',

		/**
		 * 
		 */
		defaultAjaxLoadingMsgStyle : 'clear',

		/**
		 * 
		 * @param conn
		 * @param options
		 * @returns
		 */
		showAjaxLoadingMsg : function(conn, options) {
			_ajaxLoadingMsgOwner.push(conn);
			if (!_currentAjaxLoadingMsg) {
				var loadingMsg = Ext.ux.jnap.NotificationMgr.defaultAjaxLoadingMsgText;
				_currentAjaxLoadingMsg = Ext.ux.jnap.NotificationMgr.notify({
					msg : {
						msg : String.format('<p class="{1}">{0}</p>', loadingMsg, 'x-loading'),
						type : Ext.ux.jnap.NotificationMgr.defaultAjaxLoadingMsgStyle,
						extraCls : 'no-icon',
						animateOnShow : false,
						animateOnHide : false
					},
					width : 200,
					position : Ext.ux.jnap.NotificationMgr.TARGET_TOP_LEFT
				});
			}
		},

		/**
		 * 
		 * @param conn
		 * @param response
		 * @param options
		 * @returns
		 */
		hideAjaxLoadingMsg : function(conn, response, options) {
			_ajaxLoadingMsgOwner.remove(conn);
			if (_ajaxLoadingMsgOwner.length == 0 &&
					(_currentAjaxLoadingMsg != null && _currentAjaxLoadingMsg.isVisible())) {
				_currentAjaxLoadingMsg.hide();
				_currentAjaxLoadingMsg = null;
			}
		},

		/**
		 * 
		 * @returns
		 */
		registerDefaultLoadingMsgOnAjax : function() {
			var scope = Ext.ux.jnap.NotificationMgr;
			Ext.Ajax.on('beforerequest', scope.showAjaxLoadingMsg, scope);
			Ext.Ajax.on('requestcomplete', scope.hideAjaxLoadingMsg, scope);
			Ext.Ajax.on('requestexception', scope.hideAjaxLoadingMsg, scope);
		}

	};
}();

Ext.ns('Ext.ux.jnap');

/**
 * @class Ext.ux.jnap.Rating
 * @extends Ext.BoxComponent
 */
Ext.ux.jnap.Rating = Ext.extend(Ext.BoxComponent, {

	/**
	 * @cfg {Boolean} animateOnChange
	 */
	animateOnChange : true,

	baseCls : 'x-rating',

	minValue : 1,

	maxValue : 5,

	values : undefined,

	valueSplit : 1,

	userValue : undefined,

	averageValue : undefined,

	clearOption : true,

	clearText : 'Clear my rating',

	clearValue : -1,

	defaultDisplayValue : 'user',

	switchValueOption : true,

	rateSpriteCls : 'x-rating-star',

	rateSpriteImg : {
		url : undefined,
		width : 16,
		height : 16
	},

	showHintTip : true,

	hintTipText : ['Very poor', 'Poor', 'OK', 'Very good', 'Excellent'],

	// private
	initComponent : function() {
		Ext.ux.jnap.Rating.superclass.initComponent.call(this);
		this.addEvents(
			/**
			 * @event
			 */
			'change',
			/**
			 * @event
			 */
			'clear',
			/**
			 * @event
			 */
			'switch'
		);
	},

	// private
	onRender : function(ct, position) {
		this.el = position
				? this.tpl.insertBefore(position, this, true)
				: this.tpl.append(ct, this, true);
		this.el.setVisibilityMode(Ext.Element.DISPLAY);

		if (this.values) {
			
		}

		this.mon(this.el, this.onMouseOver);
		this.enable = this.enable.createSequence(this._bindEvents);
		this.disable = this.disable.createSequence(this._unbindEvents);
	},

	fillTo : function() {
		
	},

	_bindEvents : function() {
		
	},

	_unbindEvents : function() {
		
	}
});


/**
 * @class Ext.ux.jnap.TagCloud
 * @extends Ext.DataView
 */
Ext.ux.jnap.TagCloud = Ext.extend(Ext.DataView, {

	/**
	 * @cfg {Boolean} animated
	 */
	animated : true,

	/**
	 * @cfg {String} baseCls
	 */
	baseCls : 'x-tagcloud',

	/**
	 * @cfg {String} fontSizeUnit
	 */
	fontSizeUnit : 'px',

	/**
	 * @cfg {String} headStyle
	 */
	headStyle : 'cloud',

	/**
	 * @cfg {Number} minFontSize
	 */
	minFontSize : 11,

	/**
	 * @cfg {Number} maxFontSize
	 */
	maxFontSize : 28,

	/**
	 * @cfg {String} occurencesProperty
	 */
	occurencesProperty : 'occurences',

	/**
	 * @cfg {String} tagLink
	 */
	tagLink : 'tag/{text}',

	/**
	 * @cfg {String} tagText
	 */
	tagText : '{text}',

	/**
	 * @cfg {String} title
	 */
	title : undefined,

	// private
	initComponent : function() {
		Ext.ux.jnap.TagCloud.superclass.initComponent.call(this);
		Ext.apply(this, {
			cls : this.baseCls,
			itemSelector : 'span.' + this.baseCls + '-tag',
			singleSelect : false,
			multiSelect : false,
			selectedClass : '',
			overClass : this.baseCls + '-tag-over'
		});
		this.tpl = new Ext.XTemplate(
			'<tpl if="headStyle != \'plain\'"><div class="{baseCls}-header-{headStyle}"></div></tpl>',
			'<div class="{baseCls}-body">',
				'<tpl if="title"><h3>{title}</h3></tpl>',
				'<p class="{baseCls}-tag-list">',
				'<tpl for="tags">',
					'<span class="{parent.baseCls}-tag">',
						'<a href="' + this.tagLink + '">' + this.tagText + '</a>',
					'</span>',
				'</tpl>',
				'</p>',
			'</div>', {
				compiled: true,
				disableFormats: true
			}
		);
	},

	// overridden
	collectData : function(records, startIndex) {
		var data = this;
		Ext.apply(data, {
			tags : Ext.ux.jnap.TagCloud.superclass.collectData.call(this, records, startIndex)
		});
		return data;
	},

	// overridden
	refresh : function() {
		Ext.ux.jnap.TagCloud.superclass.refresh.call(this);
		this.onRefresh.defer(10, this);
	},

	/**
	 * Calculates and updates the font size of each tag after 'refresh'.
	 */
	onRefresh : function() {
		var occurencesArray = this.store.collect(this.occurencesProperty);
		var minOccurs = Ext.min(occurencesArray),
			maxOccurs = Ext.max(occurencesArray);
		Ext.each(this.all.elements, function(item, i, array) {
			// calculating font size using logarithmic mapping
			var record = this.store.getAt(item.viewIndex);
			var tagOccurs = record.get(this.occurencesProperty);
			var weight = (Math.log(tagOccurs) - Math.log(minOccurs)) / (Math.log(maxOccurs) - Math.log(minOccurs));
			var fontSize = this.minFontSize + Math.round((this.maxFontSize - this.minFontSize) * weight);
			// setting font size
			this._setTagFontSize(Ext.fly(item).first(), fontSize);
		}, this);
	},

	/**
	 * 
	 * @param tagEl
	 * @param fontSize
	 */
	_setTagFontSize : function(tagEl, fontSize) {
		if (this.animated) {
			tagEl.animate({
				fontSize : {
					from : this.minFontSize,
					to : fontSize,
					unit : this.fontSizeUnit
				}
			}, 0.3, null, 'easeOut', 'run');
		} else {
			tagEl.setStyle('fontSize', fontSize + this.fontSizeUnit);
		}
	}

});


Ext.ux.jnap.XBody = new (Ext.extend(Ext.util.Observable, {
	
	bodyEl : undefined,

	_prevSize : {
		height : 0,
		width : 0
	},

	constructor : function() {
		this.bodyEl = Ext.getBody();
		this.addEvents(
			'change'
		);
	},

	fireChangeEvent : function() {
		var currentSize = this.bodyEl.getSize();
		if ((this._prevSize.height != currentSize.height)
			|| (this._prevSize.width != currentSize.width)) {
			this.fireEvent('change', this, this._prevSize.width, this._prevSize.height,
				currentSize.width, currentSize.height);
			Ext.apply(this._prevSize, currentSize);
		}
	},

	applyChangeEvents : function() {
		// Component
		var cmp = Ext.Component.prototype;
		cmp.onHide = cmp.onHide.createSequence(this.fireChangeEvent, this); 
		cmp.onShow = cmp.onShow.createSequence(this.fireChangeEvent, this);
		cmp.onRemoved = cmp.onRemoved.createSequence(this.fireChangeEvent, this);
		cmp.onAdded = cmp.onAdded.createSequence(this.fireChangeEvent, this);
		// BoxComponent
		var boxCmp = Ext.BoxComponent.prototype;
		boxCmp.onResize = boxCmp.onResize.createSequence(this.fireChangeEvent, this);
		// Container
		var contCmp = Ext.Container.prototype;
		contCmp.doLayout = contCmp.doLayout.createSequence(this.fireChangeEvent, this);
		// Panel
		var panelCmp = Ext.Panel.prototype;
		panelCmp.onCollapse = panelCmp.onCollapse.createSequence(this.fireChangeEvent, this);
		panelCmp.onExpand = panelCmp.onExpand.createSequence(this.fireChangeEvent, this);
		panelCmp.onBodyResize = panelCmp.onBodyResize.createSequence(this.fireChangeEvent, this);
		// NotificationMessage
		var notMsgCmp = Ext.ux.jnap.NotificationMessage.prototype;
		notMsgCmp.onShow = notMsgCmp.onShow.createSequence(this.fireChangeEvent, this);
		notMsgCmp.onHide = notMsgCmp.onHide.createSequence(this.fireChangeEvent, this);
	}

}))();

Ext.ns('Ext.ux.jnap.util');
/**
 * @class Ext.ux.jnap.util.Defaults
 * @singleton
 * @since 1.0
 */
Ext.ux.jnap.util.Conventions = function() {

	return {

		/**
		 * <code>true</code> to auto apply conventions at lib load time.
		 */
		autoApply : true,

		/**
		 * Maps a shorter base namespace, from 'Ext.ux.jnap' to just 'jnap'.
		 */
		enableNamespaceShortcut : function() {
			Ext.ns('jnap');
			jnap = Ext.ux.jnap;
		},

		setDefaultDataProperties : function() {
			Ext.data.JsonReader.prototype.root = 'modelList';
			Ext.data.JsonReader.prototype.id = 'id';
			Ext.data.JsonReader.prototype.restful = true;
		},

		DEFAULT_PAGE_SIZE : 15,

		doAutoLoadWithPaging : function() {
			return { start : 0, limit : Ext.ux.jnap.util.Conventions.DEFAULT_PAGE_SIZE };
		},

		setDefaultPagingConfig : function(pageSize) {
			Ext.PagingToolbar.prototype.pageSize = pageSize;
			Ext.data.JsonReader.prototype.totalProperty = 'pagingData["totalResults"]';
		},

		setDefaultFormConventions : function() {
			Ext.form.ComboBox.prototype.queryParam = 'searchQuery';
		},

		enableBodyChangedEvents : function() {
			Ext.ux.jnap.XBody.applyChangeEvents();
		},

		applyPlainButtonMarkup : function() {
			Ext.Button.buttonTemplate = new Ext.Template(
				'<div class="x-btn {1} {2} {3}"><em unselectable="on"><button id="{4}" type="{0}"></button></em></div>', {
				compiled : true
			});
		},

		applyAll : function() {
			Ext.QuickTips.init();
			jnapconv.enableNamespaceShortcut();
			jnapconv.setDefaultDataProperties();
			jnapconv.setDefaultPagingConfig(jnapconv.DEFAULT_PAGE_SIZE);
			jnapconv.enableBodyChangedEvents();
			jnapconv.applyPlainButtonMarkup();
			jnap.NotificationMgr.registerDefaultLoadingMsgOnAjax();
		}

	};
}();

jnapconv = Ext.ux.jnap.util.Conventions;
(function() {

	// Ext.ToolTip anchor behaviour
	Ext.override(Ext.ToolTip, {
		initTarget : function(target) {
			var t;
			if ((t = Ext.get(target))) {
				var showEvents = this.showEvents || [];
				var hideEvents = this.hideEvents || [];
				if (this.target) {
					var tg = Ext.get(this.target);
					if (!this.suppressDefaultEvents) {
						this.mun(tg, 'mouseover', this.onTargetOver, this);
						this.mun(tg, 'mouseout', this.onTargetOut, this);
						this.mun(tg, 'mousemove', this.onMouseMove, this);
					}
					Ext.each(showEvents, function(item, i, array) {
						this.mun(tg, item, this.onTargetOver, this);
					}, this);
					Ext.each(hideEvents, function(item, i, array) {
						this.mun(tg, item, this.onTargetOut, this);
					}, this);
				}
				var events = {
					scope : this
				};
				if (!this.suppressDefaultEvents) {
					Ext.apply(events, {
						mouseover : this.onTargetOver,
						mouseout : this.onTargetOut,
						mousemove : this.onMouseMove
					});
				}
				Ext.each(showEvents, function(item, i, array) {
					events[item] = this.onTargetOver;
				}, this);
				Ext.each(hideEvents, function(item, i, array) {
					events[item] = this.onTargetOut;
				}, this);
				this.mon(t, events);
				this.target = t;
			}
			if (this.anchor) {
				this.anchorTarget = this.target;
			}
		}
	});

	// remove the need of success property on submit actions
	Ext.override(Ext.form.Action, {
		processResponse : function(response) {
			this.response = response;
			if (!response.responseText && !response.responseXML) {
				return true;
			}
			this.result = this.handleResponse(response); 
			this.result['success'] = (response.status >= 200 && response.status < 300);
			return this.result;
		}
	});

	// Ext.grid.GridPanel body resize fix
	var __Ext_grid_GridPanel_prototype_afterRender = Ext.grid.GridPanel.prototype.afterRender;
	Ext.override(Ext.grid.GridPanel, {
		afterRender : function() {
			__Ext_grid_GridPanel_prototype_afterRender.call(this);
			this.mon(this.getGridEl(), 'resize', function() {
				var size = this.getGridEl().getSize();
				this.fireEvent('bodyresize', this, size.width, size.height);
			}, this);
		}
	});

	// Element.anchorTo
	var __Ext_Element_prototype_anchorTo = Ext.Element.prototype.anchorTo;
	Ext.override(Ext.Element, {
		anchorTo : function(el, alignment, offsets, animate, monitorScroll, callback) {
			var returnValue  = __Ext_Element_prototype_anchorTo.call(this, el, alignment, offsets, animate, monitorScroll, callback);
			var dom = this.dom;
			Ext.ux.jnap.XBody.on('change', function() {
				Ext.fly(dom).alignTo(el, alignment, offsets, animate);
			}, Ext.ux.jnap.XBody, { buffer : 250 });
			return returnValue;
		}
	});

	// apply jnap conventions
	var coc = Ext.ux.jnap.util.Conventions;
	if (coc.autoApply) {
		coc.applyAll();
	}

})();
Ext.ns('Ext.ux.jnap.util');

Ext.ux.jnap.util.ExtUtils = function() {

	var _syncFieldWrapSize = function(width, height) {
		this.getEl().setSize(width, height); // field scoped call
	};

	return {

		/**
		 * 
		 * @param field
		 * @returns
		 */
		wrapField : function(field) {
    		if (!field.isFormField) {
    			return undefined;
    		}
			if (!field.wrap) {
				field.wrap = field.getEl().wrap({cls: 'x-form-field-wrap'});
				field.positionEl = field.resizeEl = field.wrap;
				field.actionMode = 'wrap';
				field.onResize = field.onResize.createSequence(_syncFieldWrapSize, field);
			}
			return field.wrap;
		},

		createOverlay : function(el, cfg) {
			var id = Ext.id(el) + '-overlay';
			var overlay = Ext.get(id);
			if (!overlay) {
				cfg = Ext.applyIf(cfg || {}, {
					style : {
						position : 'absolute',
						zIndex : 20000
					}
				});
				overlay = Ext.getBody().createChild({
					id : id,
					cls : cfg.cls || '',
					style : cfg.style
				});
				overlay.setHeight(el.getHeight());
				overlay.setWidth(el.getWidth());
				overlay.anchorTo(el, 'tl?');
				el.on('resize', function(event, el, obj) {
					el = Ext.get(el);
					this.setHeight(el.getHeight());
					this.setWidth(el.getWidth());
				}, overlay);
			}
			return overlay;
		},

		createXhrObject : function() {
			var xhr = null;
			try {
				xhr = new XMLHttpRequest();
			} catch (e) {
				var activeX = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
				for (var i = 0; i < activeX.length; i++) {
					try {
						xhr = new ActiveXObject(activeX[i]);
						break;
					} catch(e) {
						// do nothing, try next activeX constructor and validate only at the end
					}
	            }
			}
			if (!xhr) {
				throw '[Ext.ux.jnap.util.ExtUtils.createXhrObject] This client has no support '
					+ 'for Ajax (XMLHttpRequest).';
			}
			return xhr;
		},

		/**
		 * 
		 */
		highlightKeyword : function(node, match, cls, deep) {
			if (node.nodeType != 3) {
				if (deep) {
					Ext.each(node.childNodes, function(child) {
						highlight(child, match, cls, deep);
					}, this);
				}
			} else {
				Ext.fly(node).replaceWith({
					tag : 'span',
					html : node.nodeValue.replace(new RegExp(match, 'gi'),
							String.format('<span class="{0}">{1}</span>', cls, match))
				});
			}
		}

	};
}();

// Alternative (shorter) name



Ext.ns('Ext.ux.jnap.data');
/**
 * @class Ext.ux.jnap.data.JsonErrorReader
 * @extends Ext.data.JsonReader
 */
Ext.ux.jnap.data.JsonErrorReader = Ext.extend(Ext.data.JsonReader, {
	read : function(response) {
		alert(response);
	},
	readRecords : function(o) {
		alert(o);
	}
});

Ext.ns('Ext.ux.jnap.data');
/**
 * @class Ext.ux.jnap.data.XmlErrorReader
 * @extends Ext.data.XmlReader
 */
Ext.ux.jnap.data.XmlErrorReader = Ext.extend(Ext.data.XmlReader, {
	read: function(response) {
	},
	readRecords: function(o) {
	}
});

Ext.ns('Ext.ux.jnap.form');


/**
 * @class Ext.ux.jnap.Autocomplete
 * @extends Ext.form.ComboBox
 */
Ext.ux.jnap.form.Autocomplete = Ext.extend(Ext.form.ComboBox, {

	animateOnItemAdd : false,

	animateOnItemRemove : false,

	autoSelect : false,

	baseCls : 'ux-autocomplete',

	bindItemAddKey : true,

	blockAlreadyAddedItem : true,

	defaultItemWidth : 200,

	emptyText : 'emptyText',

	hideTrigger : true,

	itemContainerMinWidth : undefined,

	itemShadow : false,

	/**
	 * @cfg {String} itemLayout
	 */
	itemLayout : 'inline',

	itemMinWidth : 150,

	itemWidth : undefined,

	itemTpl : '{displayField}',

	listEmptyText : 'listEmptyText',

	itemCloseTip : 'Click to remove item',

	minChars : 1,

	multiple : false,

	queryParam : 'searchQuery',

	removedItemsName : undefined,

	submitOnlyNewItems : false,

	// private
	_currentSelectedRecord : null,

	// private
	_addedItems : new Ext.util.MixedCollection(),

	initComponent : function() {
		Ext.ux.jnap.form.Autocomplete.superclass.initComponent.call(this);
		if (!!this.multiple) {
			this._applyMultipleConfig();
			this.afterRender = this.afterRender.createSequence(this._bindEvents, this);
			this.addEvents(
				/**
				 * @event
				 */
				'beforeitemadd',
				/**
				 * @event
				 */
				'itemadded',
				'beforeitemremove',
				'itemremoved'
			);
			// item tpl
			if (Ext.isString(this.itemTpl)) {
				this.itemTpl = new Ext.XTemplate(this.itemTpl, { compiled : true });
			}
		}
	},

	onTriggerClick : function() {
		if (this._currentSelectedRecord) {
			this.addItem(this._currentSelectedRecord);
			this.clear();
		}
	},

	addItem : function(record) {
		if (!this.wasAlreadyAdded(record) && this.fireEvent('beforeitemadd', this, record) !== false) {
			var addedItemEl = this.onItemAdd(record);
			this.fireEvent('itemadded', this, record, addedItemEl);
		}
	},

	onItemAdd : function(record) {
		var item = new Ext.ux.jnap.AutocompleteItem(this, record);		
		this._addedItems.add(item);
		return item;
	},

	clear : function() {
		this.setValue('');
		this._currentSelectedRecord = null;
	},

	wasAlreadyAdded : function(record) {
		var alreadyAdded = false;
		if (this.blockAlreadyAddedItem) {
			alreadyAdded = this._addedItems.find(function(item) {
				return item.record.id == record.id;
			}, this) != null;
		}
		return alreadyAdded;
	},

	onDestroy : function() {
		if (this.rendered) {
//			Ext.destroyMembers(this, '_textEl', '_titleEl');
		}
		Ext.ux.jnap.form.Autocomplete.superclass.onDestroy.call(this);
	},

	_applyMultipleConfig : function() {
		this.hideTrigger = false;
		this.triggerClass = this.baseCls + '-add-trigger';
	},

	getItemContainer : function() {
		if (!this._selectedItemsEl) {
			var fieldWrap = Ext.ux.jnap.util.ExtUtils.wrapField(this);
			this._selectedItemsEl = fieldWrap.createChild({
				tag : 'div',
				cls : this.baseCls + '-multiple-items'
			});
			this._selectedItemsEl.addClass(this.itemLayout);
			if (this.itemShadow) {
				this._selectedItemsEl.addClass('shadow');
			}
			if (this.itemContainerMinWidth) {
				fieldWrap.setWidth(this.itemContainerMinWidth);
			}
			this._bindEvents();
		}
		return this._selectedItemsEl;
	},

	_resetCurrentRecord : function() {
		this._currentSelectedRecord = null;
	},

	_bindEvents : function() {
		this.mon(this, 'select', function(field, record, index) {
			this._currentSelectedRecord = record;
		}, this);
		// key events
		this.enableKeyEvents = true;
		this.mon(this, 'specialkey', function(field, e) {
			if (this.bindItemAddKey && (e.getKey() == e.ENTER)) {
				this.onTriggerClick();
			}
		}, this);
	}

});

/**
 * @class Ext.ux.jnap.AutocompleteItem
 * @extends Object
 */
Ext.ux.jnap.AutocompleteItem = Ext.extend(Object, {

	autocomplete : null,

	id : null,

	itemEl : null,

	record : null,

	removeItemEl : null,

	constructor : function(autocomplete, record) {
		this.autocomplete = autocomplete;
		this.record = record;
		this.itemEl = this._createItemEl(autocomplete.getItemContainer());
		this.itemEl.setVisible(true, this.getParentCfg('animateOnItemAdd'));
	},

	/**
	 * Gets a config value from the parent (autocomplete component).
	 * @param {String} configName The config name.
	 * @return {Object} The value of the config param associated with the provided name or null.
	 */
	getParentCfg : function(configName) {
		return this.autocomplete[configName];
	},

	/**
	 * Remove this item from the added items. It fires the 'beforeitemremove' before removal
	 * so if you want to stop item removal you should return false on that listener.
	 * After a successful removal the 'itemremoved' event is fired.
	 */
	remove : function() {
		this.autocomplete._addedItems.remove(this);
		if (this.autocomplete.fireEvent('beforeitemremove', this.autocomplete, this) !== false) {
			var _doRemove = function() {
				this.autocomplete.fireEvent('itemremoved', this.autocomplete, this);
				this.removeItemTooltip.hide();
				Ext.destroyMembers(this, 'itemEl', 'removeItemEl', 'removeItemTooltip');
			};
			if (this.getParentCfg('animateOnItemRemove')) {
				this.itemEl.setVisible(false, {
					callback : _doRemove.createDelegate(this)
				});
			} else {
				this.itemEl.setVisible(false);
				_doRemove.call(this);
			}
		}
	},

	getEl : function() {
		return this.itemEl;
	},

	// private
	_createItemEl : function(ct) {
		var tplArgs = this._getTplArgs();
		var baseCls = this.getParentCfg('baseCls');
		var item = ct.createChild({
			tag : 'div',
			cls : baseCls + '-multiple-item',
			style : {
				display : 'none'
			},
			children : [{
				tag : 'input',
				type: 'hidden',
				name : this.getParentCfg('name'),
				value : tplArgs.valueField
			}, {
				tag : 'span',
				cls : baseCls + '-multiple-item-content',
				html : this.getParentCfg('itemTpl').apply(tplArgs)
			}]
		});
		this.removeItemEl = this._createItemRemoveEl(item);
		var width = ('stack' === this.getParentCfg('itemLayout') && !this.getParentCfg('itemWidth'))
			? this.getParentCfg('defaultItemWidth') : null;
		if (width) {
			item.setWidth(width);
		}
		var minWidth = this.getParentCfg('itemMinWidth') || 0;
		if (item.getWidth() < minWidth) {
			item.setWidth(minWidth);
		}
		this.id = Ext.id(item);
		return item;
	},

	// private
	_createItemRemoveEl : function(item) {
		var el = item.createChild({
			tag : 'span',
			cls : this.getParentCfg('baseCls') + '-multiple-item-remove'
		});
		this.removeItemTooltip = new Ext.ToolTip({
			target : el,
			html : this.getParentCfg('itemCloseTip')
		});
		this.autocomplete.mon(el, 'click', this.remove, this);
		return el;
	},

	_getTplArgs : function() {
		var r = this.record;
		var tplArgs = Ext.apply({}, r.data);
		Ext.apply(tplArgs, {
			id : r.id,
			displayField : r.get(this.getParentCfg('displayField')),
			valueField : r.get(this.getParentCfg('valueField'))
		});
		return tplArgs;
	}

});

Ext.ns('Ext.ux.jnap.form');

/**
 * @class Ext.ux.jnap.form.ChainedComboBoxPlugin
 */
Ext.ux.jnap.form.ChainedComboBoxPlugin = Ext.extend(Object, {

	/**
	 * @cfg {Ext.form.ComboBox|String} comboRef
	 * A reference of an id of the parent combo.
	 */
	comboRef : null,

	/**
	 * @cfg {String} paramName
	 * The name of the param to be added to this combo store with the parent combo value.
	 * Defaults to the parent combo 'name' property.
	 */
	paramName : null,

	constructor : function(config) {
		config = config || {};
		Ext.apply(this, config);
	},

	init : function(combo) {
		if (!this.comboRef) {
			throw 'The parent combo reference cannot be null';
		}
		this._otherCombo = Ext.isString(this.comboRef)
			? Ext.getCmp(this.comboRef)
			: this.comboRef;
		if (!(this._otherCombo instanceof Ext.form.ComboBox)) {
			throw 'The parent combo must be of type \"Ext.form.ComboBox\" or subclasses of it.';
		}
		combo.disable();
		this._combo = combo;
		this._otherCombo.mon(this._otherCombo, 'select', this._onValueUpdate, this);
		this._otherCombo.mon(this._otherCombo, 'change', this._onValueUpdate, this);
		this._otherCombo.mon(this._otherCombo, 'disable', this._onDisable, this);
	},

	_onValueUpdate : function(combo, value) {
		var cb = this._combo;
		if (cb.disabled && value) {
			cb.enable();
		}
		this._resetCombo(cb);
		if (!value) {
			cb.disable();
		}
		cb.getStore().setBaseParam(this.paramName || combo.hiddenName || combo.name, combo.getValue());
	},

	_onDisable : function(combo) {
		var cb = this._combo;
		this._resetCombo(cb);
		cb.disable();
	},

	_resetCombo : function(combo) {
		var value = combo.getValue();
		combo.clearValue();
		combo.lastQuery = null;
		combo.getStore().removeAll();
		combo.fireEvent('change', combo, null, value);
	}

});

Ext.ns('Ext.ux.jnap.form');

/**
 * @class Ext.ux.jnap.form.CharactersLimitPlugin
 * @extends Object
 * An {@link Ext.form.TextArea} plugin
 */
Ext.ux.jnap.form.CharactersLimitPlugin = Ext.extend(Object, {

	/**
	 * @cfg {String} text
	 */
	text : 'You have <strong>{0}</strong> characters remaining',

	/**
	 * @cfg {String} baseCls
	 */
	baseCls : 'x-field-charlimit-hint',

	/**
	 * @cfg {Boolean} crop
	 */
	crop : false,

	constructor : function(config) {
		config = config || {};
		Ext.apply(this, config);
	},

	/**
	 * @param {Ext.form.TextArea} textarea
	 */
	init : function(textarea) {
		if (!(textarea instanceof Ext.form.TextArea) || !textarea.maxLength) {
			return false;
		}
		this.textarea = textarea;

		// force textarea to enable key events listening
		Ext.apply(textarea, {
			enableKeyEvents : true
		});
		textarea.afterRender = textarea.afterRender.createSequence(this.afterRender, this);
	},

	afterRender : function() {
		var field = this.textarea;
		if (this.text) {
			Ext.ux.jnap.util.ExtUtils.wrapField(field);
			this.charsLeftEl = field.wrap.createChild({
				tag : 'div',
				cls : this.baseCls
			});
		}
		this.handleCharLimit();
		this._bindListeners();
	},

	/**
	 * 
	 */
	handleCharLimit : function() {
		var field = this.textarea;
		var max = field.maxLength;
		var currentValue = field.getValue();
		var charcount = 0;
		if (currentValue) {
			charcount = currentValue.length;
		}
		if (charcount > max && this.crop) {
			field.setValue(currentValue.substring(0, max));
			charcount = max;
		}
		if (this.text) {
			this.charsLeftEl.update(String.format(this.text, (max - charcount)));
		}
	},

	_bindListeners : function() {
		// 'paste' and 'input' are browser custom events
		Ext.each(['keydown', 'paste', 'input'], function(item, i, array) {
			this.textarea.mon(this.textarea.el, item, this.handleCharLimit,	this, {buffer : 100});
		}, this);
	}

});

Ext.preg('charlimit', Ext.ux.jnap.form.CharactersLimitPlugin);

Ext.ns('Ext.ux.jnap.form');

/**
 * @class Ext.ux.jnap.form.ClearFieldPlugin
 * @extends Object
 */
Ext.ux.jnap.form.ClearFieldPlugin = Ext.extend(Object, {

	/**
	 * @cfg {String} baseCls
	 */
	baseCls : 'x-field-clear',

	/**
	 * @cfg {String} clearValue
	 */
	clearValue : '',

	/**
	 * @cfg {String} clearTip
	 */
	clearTip : 'Click to clear the field',

	/**
	 * @cfg {Boolean} animateOnShow
	 */
	animateOnShow : true,

	/**
	 * @cfg {Boolean} animateOnHide
	 */
	animateOnHide : true,

	constructor : function(config) {
		config = config || {};
		Ext.apply(this, config);
	},

	/**
	 * @param {Ext.form.Field} field
	 */
	init : function(field) {
		if (!field instanceof Ext.form.Field) {
			return false;
		}
		this.field = field;
		field.afterRender = field.afterRender.createSequence(this.afterRender, this);
	},

	afterRender : function() {
		this._createClearTrigger();
		this.field.mon(this.field.el, 'mouseover', this.onMouseOver, this, { buffer : 20 });
		this.field.mon(this.field.el, 'mouseout', this.onMouseOut, this, { buffer : 20 });
		this.field.mon(this.field, 'afterrender', this._doTriggerPosition, this);
		this.field.mon(this.field, 'destroy', this.onDestroy, this);
	},

	onMouseOver : function() {
		if (!this._triggerEl.isVisible()) {
			if (this.animateOnShow) {
				this._triggerEl.fadeIn({ endOpacity : 0.65, duration : 0.2});
			} else {
				this._triggerEl.show();
			}
		}
	},

	onMouseOut : function() {
		if (!this._triggerEl.hasClass(this.baseCls + '-over')) {
			if (this.animateOnHide) {
				this._triggerEl.fadeOut({ duration : 0.2 });
			} else {
				this._triggerEl.hide();
			}
			this._triggerTip.hide();
		}
	},

	onDestroy : function() {
		Ext.destroyMembers(this, '_triggerEl', '_triggerTip');
	},

	// protected
	onClick : function() {
		this.field.setValue(this.clearValue);
		this.field.focus();
	},

	// private
	_createClearTrigger : function() {
		this._triggerEl = this.field.el.parent().createChild({
			tag : 'span',
			cls : this.baseCls
		}, this.field.el);
		this._triggerEl.addClassOnOver(this.baseCls + '-over');
		this._triggerEl.setVisibilityMode(Ext.Element.VISIBILITY);
		this.field.mon(this._triggerEl, 'click', this.onClick, this);
		this._doTriggerPosition();
		
		// clear trigger tip
		this._triggerTip = new Ext.ToolTip({
			target: this._triggerEl,
			html: this.clearTip
		});
	},

	// private
	_doTriggerPosition : function() {
		this._triggerEl.setStyle('zIndex', this.field.el.getStyle('zIndex') + 1);
		this._triggerEl.anchorTo(this.field.el, 't-tr', [-10, 3]);
	}

});

Ext.preg('clearfield', Ext.ux.jnap.form.ClearFieldPlugin);


Ext.ns('Ext.ux.jnap.form');

/**
 * @class Ext.ux.jnap.form.FieldHintTypeRenderer
 */
Ext.ux.jnap.form.FieldHintTargetRenderer = {
	'bottom' : {
		renderHint : function(hintPlugin) {
			var field = hintPlugin._field;
			var fieldWrap = Ext.ux.jnap.util.ExtUtils.wrapField(field);
			if (fieldWrap) {
				var hintEl = fieldWrap.createChild({
					cls: hintPlugin.baseCls,
					html: field.getHintText()
				});
				field.hintEl = hintEl;
			}
		},

		clearHint : function(hintPlugin) {
		}
	}
};

/**
 * @class Ext.ux.jnap.form.FieldHintPlugin
 */
Ext.ux.jnap.form.FieldHintPlugin = Ext.extend(Object, {

	/**
	 * @cfg {String} hintText
	 */
	hintText : '',

	/**
	 * @cfg {String} baseCls
	 */
	baseCls : 'x-field-hint',

	/**
	 * @cfg {Number} hintType
	 */
	hintTarget : 'bottom',

	_field : undefined,

	constructor : function(config) {
		Ext.apply(this, config || {});
    },

    /**
     * @param {Ext.form.Field} field
     */
    init : function(field) {
    	// is it a field?
    	if (!field.isFormField) {
    		return false;
    	}
    	this._renderer = Ext.ux.jnap.form.FieldHintTargetRenderer[this.hintTarget];
    	if (!this._renderer) {
    		// no valid renderer
    		return false;
    	}
    	this._field = field;

    	// apply Hint properties to the field
    	Ext.apply(this._field, {
    		getHintText : this.getHintText.createDelegate(this),
    		getHintCls : null,
    		setHintText : null,
    		removeHint : null,
    		showHint : null,
    		hideHint : null
    	});

    	// init
    	this._hintTpl = new Ext.Template(this.hintText, {
    		compiled: true
    	});
    	this._refreshHintText();
    	field.afterRender = field.afterRender.createSequence(this.afterRender, this);
    },

    afterRender : function() {
    	this._renderer.renderHint(this);
    },

    getHintText : function() {
    	return this._hintMsg;
    },

    _refreshHintText : function() {
    	this._hintTpl.set(this.hintText, true);
    	this._hintMsg = this._hintTpl.apply(this._field);
    }

});
/**
 * @class Ext.ux.jnap.form.FormUtils
 * @extends Object
 * @singleton
 * <p>A singleton class that contains form utilities, mainly a generic function for form submitting
 * that handle RESTful methods (PUT, DELETE) using a hidden field ({@link #restfulMethodParamName})
 * and automaticaly result and message handling (using {@link Ext.ux.jnap.NotificationMessage}).</p>
 * <p>More details can be found on each method documentation.</p>
 */
Ext.ux.jnap.form.FormUtils = function() {

	var _getErrorMsg = function(response) {
		var msg = undefined;
		switch (response.failureType) {
		case Ext.form.Action.CLIENT_INVALID:
			msg = {
				type : 'warning',
				msg : Ext.ux.jnap.form.FormUtils.defaultInvalidMsg
			};
			break;
		case Ext.form.Action.CONNECT_FAILURE:
			msg = {
				type : 'error',
				msg : Ext.ux.jnap.form.FormUtils.defaultErrorMsg
			};
			break;
		default:
			msg = {
				type : 'error',
				msg : response.result.msg,
				dismissDelay : 0
			};
		}
		return msg;
	};

	return {

		defaultSuccessMsg : 'Your data has been successfully submitted.',

		defaultInvalidMsg : 'Your form contains invalid data, correct it and try again.',

		defaultErrorMsg : 'There was a server communication error while processing your form.',

		defaultResetOnSuccess : false,

		defaultClearOnSuccess : false,

		defaultSubmitMethod : 'POST',

		restfulMethodParamName : '_http_method',

		formMessageDefaults : {
			closeable : true,
			dismissDelay : 5000,
			destroyOnHide : true
		},

		submit : function(src, evt, opts) {
			opts = opts || {};
			Ext.applyIf(opts, {
				clearOnSuccess : Ext.ux.jnap.form.FormUtils.defaultClearOnSuccess,
				errorMsg : _getErrorMsg,
				invalidMsg : Ext.ux.jnap.form.FormUtils.defaultInvalidMsg,
				resetOnSuccess : Ext.ux.jnap.form.FormUtils.defaultResetOnSuccess,
				msgTarget : Ext.getBody(),
				onSuccess : Ext.emptyFn,
				onError : Ext.emptyFn,
				successMsg : Ext.ux.jnap.form.FormUtils.defaultSuccessMsg
			});
			var formPanel = opts.form || src.findParentByType(Ext.form.FormPanel);
			if (formPanel.submitConfig) {
				Ext.apply(opts, formPanel.submitConfig);
			}
			if (!formPanel) {
				throw String.format('[FormUtils.submit] The button {0} is not inside a form.', src.id);
			}
			var form = formPanel.getForm();
			if (form.isValid()) {
				var formMethod = opts.method || form.method || formPanel.method;
				if (!formMethod) {
					formMethod = Ext.ux.jnap.form.FormUtils.defaultSubmitMethod;
				}
				formMethod = formMethod.toUpperCase();
				var headers = {};
				if (formMethod != 'GET' && formMethod != 'POST') {
					formPanel.add({
						xtype : 'hidden',
						name : Ext.ux.jnap.form.FormUtils.restfulMethodParamName,
						value : formMethod
					});
					formPanel.doLayout();
					headers['X-HTTP-Method-Override'] = formMethod;
					formMethod = 'POST';
				}
				src.disable();
				form.submit({
					url : opts.url || form.url || formPanel.url,
					method : formMethod,
					headers : headers,
					success : function(form, response) {
						src.enable();
						opts.onSuccess.call(form, form, response);
						if (opts.resetOnSuccess) {
							form.reset();
						}
						if (opts.clearOnSuccess) {
							// TODO clear all fields
						}
						Ext.ux.jnap.form.FormUtils.showMessage(formPanel, {
							msg : opts.successMsg,
							type : 'success'
						}, opts.msgTarget);
					},
					failure : function(form, response) {
						src.enable();
						opts.onError.call(form, form, response);
						var errorMsg = Ext.isFunction(opts.errorMsg)
								? opts.errorMsg.call(form, response)
								: opts.errorMsg;
						Ext.ux.jnap.form.FormUtils.showMessage(formPanel, errorMsg, opts.msgTarget);
					}
				});
			} else {
				Ext.ux.jnap.form.FormUtils.showMessage(formPanel, {
					msg : Ext.ux.jnap.form.FormUtils.defaultInvalidMsg,
					type : 'warning'
				}, opts.msgTarget);
				// focus first invalid field
				var invalidFields = formPanel.findBy(function(item) {
					return item.isFormField && item.isValid && !item.isValid(false);
				});
				invalidFields[0].focus();
			}
		},

		showMessage : function(formPanel, msg, msgTarget) {
			Ext.applyIf(msg, Ext.ux.jnap.form.FormUtils.formMessageDefaults);

			// does the panel or any parent has the NotificationMessage plugin installed?
			var notificationMsgPanel = formPanel.showNotificationMsg ? formPanel : undefined;
			if (!notificationMsgPanel) {
				var notificationMsgPanel = formPanel.findParentBy(function(container, component) {
					return container.showNotificationMsg != undefined;
				});
			}

			// did we find a container with the NotificationMessage plugin installed?
			if (notificationMsgPanel) {
				notificationMsgPanel.showNotificationMsg(msg);
			} else if (msgTarget) {
				Ext.ux.jnap.NotificationMgr.notify({
					msg : msg,
					target : msgTarget
				});
			} else {
				// if not, let's look for (or add a new) a container for the messages
				var formMsgId = formPanel.getId() + '-messages';
				var msgContainer = Ext.get(formMsgId) || Ext.getCmp(formMsgId);
				if (!msgContainer) {
					formPanel.insert(0, new Ext.BoxComponent({
						id : formMsgId
					}));
					formPanel.doLayout();
				}
				var notificationMsg = new Ext.ux.jnap.NotificationMessage(msg);
				notificationMsg.render(formMsgId);
			}
		}

	};
}();

Ext.applyIf(Ext.form.MessageTargets, {
	'field-icon-tip' : {

		defaultErrorTipAnchor : 'left',

		mark : function(field, msg) {
			field.el.addClass(field.invalidClass);
			if (!field.errorIcon) {
				var elp = field.getErrorCt();
				if (!elp) {
					// fallback to field title msg if no error container is found (create it?)
					field.el.dom.title = msg;
					return;
				}
				field.errorIcon = elp.createChild({
					cls : 'x-form-invalid-icon'
				});
				if (field.ownerCt) {
					field.mon(field.ownerCt, 'afterlayout', field.alignErrorIcon, field);
					field.mon(field.ownerCt, 'expand', field.alignErrorIcon, field);
					// TODO how to reposition the tooltip?
					//field.alignErrorIcon = field.alignErrorIcon.createSequence
					/*field.mon(field.errorIcon, 'move', function() {
						if (this.errorTip && this.errorTip.isVisible()) {
							// is there a better way to do this?
							this.errorTip.hide();
							this.errorTip.show();//.defer(20, this.errorTip);
						}
					}, field);*/
				}

				// tip offset correction
				var mouseOffset = {
					top : [ -11, 1 ],
					left : [ 0, 0 ],
					bottom : [ -11, 5 ],
					right : [ 2, 0 ]
				};
				var anchor = field.errorTipAnchor || this.defaultErrorTipAnchor;
				field.errorTip = new Ext.ToolTip({
					html : msg,
					target : field.errorIcon,
					showDelay : 100,
					autoHide : false,
					minWidth : 120,
					maxWidth : 280,
					anchor : anchor,
					mouseOffset : mouseOffset[anchor]
				});
				field.mon(field, 'focus', function() {
					if (!this.errorTip.isVisible() && this.el.hasClass(this.invalidClass)) {
						this.errorTip.show();
					}
				}, field);
				field.mon(field, 'blur', function() {
					if (!this.errorIconMouseOver) {
						this.errorTip.hide();
					}
				}, field);
				field.mon(field.errorIcon, 'mouseover', function() {
					this.errorIconMouseOver = true;
				}, field);
				field.mon(field.errorIcon, 'mouseout', function() {
					this.errorIconMouseOver = false;
					if (!this.el.hasClass(this.focusClass)) {
						this.errorTip.hide();
					}
				}, field);
				field.mon(field, 'resize', field.alignErrorIcon, field);
				field.mon(field, 'destroy', function() {
					Ext.destroy(this.errorIcon, this.errorTip);
				}, field);
			}
			field.alignErrorIcon();
			field.errorIcon.show();
			if (field.errorTip && field.errorTip.rendered) {
				field.errorTip.update(msg);
			}
			if (field.el.hasClass(field.focusClass)) {
				field.errorTip.show();
			}
		},

		clear : function(field) {
			if (field.errorIcon) {
				field.errorIcon.dom.qtip = '';
				field.errorIcon.hide();
				field.errorTip.hide();
			}
			field.el.removeClass(field.invalidClass);
		}
	}
});

Ext.ns('Ext.ux.jnap.form');

/**
 * @class Ext.ux.jnap.form.PasswordFieldPlugin
 * @extends Object
 */
Ext.ux.jnap.form.PasswordFieldPlugin = Ext.extend(Object, {

	capsLockTip : 'Caps Lock is <strong>on</strong>. Since passwords are case sensitive, this may cause you to enter it incorrectly.',

	showCapsLockTip : true,

	minLength : 6,

	maxLength : 14,

	validKeysRegExp : /^([a-zA-Z0-9@#])$/,

	keyFiltering : false,

	lengthLimit : false,

	_field : undefined,

	constructor: function(config) {
		Ext.apply(this, config || {});
    },

	init : function(field) {
		if (!(field instanceof Ext.form.TextField)) {
			return false; // this plugin can be only applied to instances of TextField
		}
		this._field = field;
		field.inputType = 'password';
		if (this.lengthLimit) {
			field.minLength = this.minLength;
			field.maxLength = this.maxLength;
		}
		if (this.keyFiltering) {
			field.maskRe = this.validKeysRegExp;
		}
		if (this.showCapsLockTip) {
			field.enableKeyEvents = true;
			field.afterRender = field.afterRender.createSequence(this.handleCapsLockKey, this);
		}
	},

	handleCapsLockKey : function() {
		this._field.mon(this._field.el, 'keypress', function(evt, textfield) {
			if (this._isCapsLockOn(evt)) {
				if (!this._capsLockTip) {
					this._capsLockTip = new Ext.ToolTip({
						anchor : 'top',
						dismissDelay : 4000,
						hidden : true,
						html : this.capsLockTip,
						maxWidth : 300,
						suppressDefaultEvents : true,
						target : this._field.el
					});
				}
				this._capsLockTip.show();
			} else if (this._capsLockTip && this._capsLockTip.isVisible()) {
				this._capsLockTip.hide();
			}
		}, this, { buffer : 100 });
	},

	_isCapsLockOn : function(evt) {
		var charCode = evt.getCharCode();
		var shiftOn = evt.shiftKey;
		return (charCode >= 97 && charCode <= 122 && shiftOn)
			|| (charCode >= 65 && charCode <= 90 && !shiftOn);
	}

});


Ext.ns('Ext.ux.jnap.form');

/**
 * @class Ext.ux.jnap.form.RequiredFieldsPlugin
 * @extends Object
 * An {@link Ext.form.FormPanel} plugin that adds a mark to the required (allowBlank = false)
 * fields label. A hint can be added to the form too, to indicate the presence of required fields.
 * See the config options documentation for details.
 */
Ext.ux.jnap.form.RequiredFieldsPlugin = Ext.extend(Object, {

	/**
	 * @cfg {String} mark
	 * The string to be used as a mark of a required field (allowBlank = false). Defaults to
	 * '&lt;span class=\'{0}\'&gt;*&lt;/span&gt;' where the <code>{0}</code> token is replaced by {@link #markCls}.
	 */
	mark : '<span class=\'{0}\'>*</span>',

	/**
	 * @cfg {String} markPosition
	 * The side of the field's label to render the required mark. Valid values are 'left' or 'right'.
	 * Anything different from those will cause the symbol to be right aligned. Defaults to 'right'.
	 */
	markPosition : 'right',

	/**
	 * @cfg {String} markCls
	 * The CSS class used to apply to the mark. Defaults to 'x-field-required'.
	 */
	markCls : 'x-field-required',

	/**
	 * @cfg {Boolean} showHint
	 * <code>true</code> if a hint text should be added to the form to indicate the presence of
	 * required fields (see {@link #hintText}). Defaults to <code>true</code>.
	 */
	showHint : true,

	/**
	 * @cfg {String} hintText
	 * The text used to inform that the fields marked with {@link #mark} are required. It can be
	 * omitted, see {@link #showHint}. Defaults to 'Fields marked with {0} are required' where the
	 * <code>{0}</code> token is replaced by {@link #mark}.
	 */
	hintText : 'Fields marked with {0} are required',

	/**
	 * @cfg {String|Ext.Element|Ext.Component} hintTarget
	 * A {@link Ext.Element} reference, a {Ext.Component} or a String (element or component id)
	 * which the {@link #hintText} and {@link #hintCls} will be applied to. If none specified but
	 * the {@link #showHint} is true, then a {@link Ext.BoxComponent} will be added to the end
	 * of the form. Defaults to <code>undefined</code>.
	 */
	hintTarget : undefined,

	/**
	 * @cfg {String} hintTextCls
	 * The CSS class used to apply to the hint text container. See {@link #showHint} and {@link #hintText}.
	 * Defaults to <code>'x-field-required-hint'</code>.
	 */
	hintTextCls : 'x-field-required-hint',

	constructor : function(config) {
		config = config || {};
		Ext.apply(this, config);
	},

	// private
	init : function(form) {
		// the plugin can only be attached to a FormPanel (or it subclasses)
		if (!form instanceof Ext.form.FormPanel) {
			return false;
		}
		var hasRequiredField = false;
		var requiredMark = String.format(this.mark, this.markCls);
		var requiredMarkPosition = this.markPosition;
		Ext.each(form.find(), function(item) {
			if (item.allowBlank === false) {
				if (requiredMarkPosition == 'left') {
					item.fieldLabel = requiredMark + item.fieldLabel;
				} else {
					item.fieldLabel = item.fieldLabel + requiredMark;
				}
				hasRequiredField = true;
			}
		});
		
		// should a hint be added to the form?
		if (hasRequiredField && this.showHint) {
			var formattedHint = String.format(this.hintText, requiredMark);
			if (this.hintTarget) {
				var target = this.hintTarget;
				if (Ext.isString(this.hintTarget)) {
					target = Ext.get(this.hintTarget);
					if (!target) {
						target = Ext.getCmp(this.hintTarget);
					}
				}
				// is target a valid object (Element or Component)?
				if (target && target.addClass && target.update) {
					target.addClass(this.hintTextCls);
					target.update(formattedHint);
				}
			} else {
				form.add({
					xtype : 'box',
					autoEl : {
						tag : 'div',
						cls : this.hintTextCls
					},
					html : formattedHint
				});
			}
		}
		return true;
	}

});

Ext.preg('requiredfields', Ext.ux.jnap.form.RequiredFieldsPlugin);


Ext.ns('Ext.ux.jnap.form');

/**
 * @class Ext.ux.jnap.form.TextCaseTransform
 * @singleton
 */
Ext.ux.jnap.form.TextCaseTransform = {

	/**
	 * @type String
	 */
	upper : {
		style : 'uppercase',

		changeCase : function(value) {
			return value ? value.toUpperCase() : value;
		}
	},

	/**
	 * @type String
	 */
	lower : {
		style : 'lowercase',

		changeCase : function(value) {
			return value ? value.toLowerCase() : value;
		}
	}
};

/**
 * @class Ext.ux.jnap.form.TextCasePlugin
 * @extends Object
 * A plugin that can be attached to form fields (all instances of {@link Ext.form.Field})
 * to transform the field text case.
 * 
 * @constructor
 * Create a new plugin instance
 * @param {Object} config The config object
 */
Ext.ux.jnap.form.TextCasePlugin = Ext.extend(Object, {

	/**
	 * @cfg {String} mode
	 * The mode indicates which case transformation the plugin must perform. There are two modes
	 * available by default: <code>'upper'</code> and <code>'lower'</code>. New text case 
	 * transformation can be added, see {@link Ext.ux.jnap.form.TextCaseTransform}.
	 * (defaults to <code>'upper'</code>).
	 */
	mode : 'upper',

	/**
	 * The field reference, which the plugin has been applied to.
	 * @type Ext.form.Field
	 */
	field : undefined,

	constructor : function(config) {
		config = config || {};
		Ext.apply(this, config);
    },

    // private
	init : function(field) {
		// is it a field?
		if (!field.isFormField) {
			return false;
		}
		this.field = field;
		field.afterRender = field.afterRender.createSequence(this.afterRender, this);
	},

	// private
	afterRender : function() {
		var caseHandler = Ext.ux.jnap.form.TextCaseTransform[this.mode];
		var field = this.field;
		if (caseHandler.style) {
			field.getEl().applyStyles({
				textTransform : caseHandler.style
			});
		}
		field.mon(field.getEl(), 'blur', function(evt, el, opt) {
			this.setValue(caseHandler.changeCase(this.getValue()));
		}, field);
	}

});


Ext.ns('Ext.ux.jnap.upload');

/**
 * @class Ext.ux.jnap.upload.UploadProvider
 * @extends Ext.util.Observable
 * 
 * Ext.ux.jnap.upload.UploadProvider is an abstract base class which is intended
 * to be extended and should not be created directly. For out-of-the-box implementations,
 * see {@link Ext.ux.jnap.upload.Html5Provider} and {@link Ext.ux.jnap.upload.FlashProvider}.
 * 
 * @constructor Creates a new UploadProvider.
 * @param {Object} config A config object containing the objects needed to configure the provider.
 */
Ext.ux.jnap.upload.UploadProvider = Ext.extend(Ext.util.Observable, {

	/**
	 * @cfg {String} alias
	 */
	alias : undefined,

	uploader : undefined,

	constructor : function(config) {
		Ext.apply(this, config || {});
		this.addEvents(
			/**
			 * @event initsuccess
			 */
			'initsuccess',
			/**
			 * @event initerror
			 */
			'initerror'
		);
	},

	init : function(uploader) {
		this.uploader = uploader;
	},

	/**
	 * @return {Object}
	 */
	getFeatures : function() {
		return {
			chunks : false,
			dnd : false,
			multipart : false,
			progress : false
		};
	},

	/**
	 * 
	 * @param {Ext.ux.jnap.upload.UploadFile} file
	 */
	upload : function(file) {
		if (file.getStatus() == Ext.ux.jnap.upload.UploadStatus.QUEUED
				&& this.uploader.fireEvent('beforeuploadstart', file) !== false) {
			file.setStatus(Ext.ux.jnap.upload.UploadStatus.UPLOADING);
			this.uploader.fireEvent('uploadstart', this.uploader, this, file);
			this.onUpload.call(this, file);
		}
	},

	/**
	 * 
	 * @param {Ext.ux.jnap.upload.UploadFile} file
	 */
	cancel : function(file) {
		if (this.uploader.fireEvent('beforeuploadcancel', file) !== false) {
			if (Ext.ux.jnap.upload.UploadStatus.UPLOADING == file.getStatus()) {
				this.onCancel.call(this, file);
			}
			file.setStatus(Ext.ux.jnap.upload.UploadStatus.CANCELLED);
			this.uploader.fireEvent('uploadcancel', this.uploader, this, file);
			this.uploader.fireEvent('uploadfinish', this.uploader, this, file, 299, null);
		}
	},

	bindTriggerEvents : function(el) {
		el.on({
			scope : this,
			'mouseenter' : function(event, el, opt) {
				this.uploader.fireEvent('browsefilesover', event, el);
			},
			'mouseleave' : function(event, el, opt) {
				this.uploader.fireEvent('browsefilesout', event, el);
			},
			'click' : function(event, el, opt) {
				this.uploader.fireEvent('browsefilesclick', event, el);
			}
		});
	},

	// protected 'abstract', must implement on subclass
	onCancel : function(file) {
	},

	// protected 'abstract', must implement on subclass
	onUpload : function(file) {
	},

	// protected 'abstract', must implement on subclass
	toUploadFile : function(nativeFile) {
	}

});

Ext.ns('Ext.ux.jnap.upload');

/**
 * @class Ext.ux.jnap.upload.Uploader
 * @extends Ext.util.Observable
 * @author Daniel Rochetti
 * @since 1.0
 * 
 * @constructor
 * Creates a new Uploader.
 * @param {Object} config A config object containing the objects needed for the Uploader to handle
 * the file upload logic.
 */
Ext.ux.jnap.upload.Uploader = Ext.extend(Ext.util.Observable, {

	/**
	 * @cfg {Array|Ext.ux.jnap.upload.UploadProvider} providers
	 */
	providers : undefined,

	/**
	 * @cfg {Boolean} async
	 */
	autoStart : true,

	baseCls : 'ux-upload',

	/**
	 * @cfg {Number} batchSize
	 */
	batchSize : 1,

	browseFilesTriggerEl : null,

	dropContainerEl : null,

	dropHintText : 'Drop files here',

	fileNameParam : 'upload[]',

	/**
	 * @cfg {Boolean} multiple
	 */
	multiple : true,

	/**
	 * @cfg {Number} maxQueueSize
	 * The max number of files that the queue can handle. Defaults to <code>0</code> (unlimited).
	 */
	maxQueueSize : 0,

	requiredFeatures : ['multipart'],

	/**
	 * @cfg {String} url (required)
	 */
	url : undefined,

	/**
	 * The {@link Ext.ux.jnap.upload.UploadProvider} that was successfully initialized.
	 * This is a read-only 'protected' property and must not be overwritten.
	 */
	activeProvider : undefined,

	queue : undefined,

	constructor : function(config) {
		var _me = this; // this instance alias
		Ext.apply(_me, config || {});
		var _ns = Ext.ux.jnap.upload; // this class namespace alias
		_me.addEvents(
			'beforefileadd',
			'beforefileremove',
			'beforeuploadstart',
			'beforeuploadcancel',
			'browsefilesclick',
			'browsefilesover',
			'browsefilesout',
			/**
			 * @event filesadded
			 * Fires when one file is added to the upload queue. Return false to cancel the
			 * adition of the file.
			 * @param {Uploader} this The uploader reference.
			 * @param {UploadQueue} queue The upload queue.
			 * @param {UploadFile} file File that is being added to the queue.
			 */
			'fileadded',
			/**
			 * @event filesremoved
			 * Fires when one file is removed from the upload queue. Return false to cancel
			 * file removal.
			 * @param {Uploader} this The uploader reference.
			 * @param {UploadQueue} queue The upload queue.
			 * @param {UploadFile} file File that is being removed from the queue.
			 */
			'fileremoved',
			/**
			 * @event initerror
			 * Fires when none of the providers could be sucessfully initiated.
			 * @param {Uploader} this The uploader reference.
			 */
			'initerror',
			/**
			 * @event initsuccess
			 * Fires when one provider is sucessfully initiated.
			 * @param {Uploader} this The uploader reference.
			 * @param {UploadProvider} provider The active provider.
			 */
			'initsuccess',
			/**
			 * @event queuechanged
			 * Fires when one file is successfully added or removed from the queue. Tip: if you
			 * wanna know if the file was added or removed, check for it's presence in the queue.
			 * @param {Uploader} this The uploader reference.
			 * @param {UploadQueue} queue The upload queue.
			 * @param {UploadFile} files File that changed the queue.
			 */
			'queuechanged',
			'uploadcancel',
			/**
			 * @event uploadfinish
			 * Fires when a upload is finished, no matter if it was a successful upload or not. This
			 * event is fired after 'uploadsuccess' and 'uploaderror'.
			 * @param {Uploader} this The uploader reference.
			 * @param {UploadProvider} provider The active upload provider.
			 * @param {UploadFile} file File that was uploaded.
			 * @param {Number} status The response status code.
			 * @param {Mixed} response The response, either an Object (String format) or an XML.
			 */
			'uploadfinish',
			'uploaderror',
			/**
			 * @event uploadprogress
			 * Fires multiple time during a file upload. Fired only by providers that supports
			 * progress during upload.
			 * @param {Uploader} this The uploader reference.
			 * @param {UploadProvider} provider The upload provider.
			 * @param {UploadFile} file File that is being uploaded.
			 * @param {Number} loadedSize The already uploaded size.
			 * @param {Number} loadedPercentage The uploaded percentage (between 0 and 1).
			 * @param {Number} totalSize The file total size.
			 */
			'uploadprogress',
			'uploadstart',
			'uploadsuccess'
		);
		_me.providers = _me.providers ||
				[new _ns.Html5Provider(),
				 new _ns.FlashProvider(),
				 new _ns.StandardProvider()];
		var currentProvider = null;
		for (var i = 0; i < _me.providers.length; i++) {
			currentProvider = _me.providers[i];
			var initialized = currentProvider.init(_me);
			if (initialized) {
				var providerFeatures = currentProvider.getFeatures();
				var supportedFeatures = Ext.partition(_me.requiredFeatures || [], function(feat) {
					return providerFeatures[feat];
				});
				// are there any required feature missing?
				if (supportedFeatures[1].length === 0) {
					_me.activeProvider = currentProvider;
					break;
				}
			}
		}
		// validate state
		if (!_me.activeProvider) {
			_me.fireEvent('initerror', _me);
		} else {
			_me.queue = new _ns.UploadQueue(_me);
			_me._bindDefaultEvents();
			_me.fireEvent('initsuccess', _me, _me.activeProvider);
		}
	},

	start : function(file) {
		this.activeProvider.upload(Ext.isString(file) ? this.queue.getFile(file) : file);
	},

	cancel : function(file) {
		this.activeProvider.cancel(Ext.isString(file) ? this.queue.getFile(file) : file);
	},

	_onFileAdd : function(uploader, queue, file) {
		if (this.autoStart && (queue.getUploadingCount() < this.batchSize)) {
			this.start(file);
		}
	},

	_onUploadFinish : function(uploader, provider, file) {
		var queue = this.queue;
		if (this.autoStart && (queue.getUploadingCount() < this.batchSize && queue.isPending())) {
			this.start(queue.getNextInQueue());
		}
	},

	_onUploadSuccess : function(uploader, provider, file, res) {
		file.setStatus(Ext.ux.jnap.upload.UploadStatus.DONE);
	},

	_onUploadError : function(uploader, provider, file, res) {
		file.setStatus(Ext.ux.jnap.upload.UploadStatus.FAILED);
	},

	_bindDefaultEvents : function() {
		this.on('fileadded', this._onFileAdd, this);
		this.on('uploadsuccess', this._onUploadSuccess, this);
		this.on('uploaderror', this._onUploadError, this);
		this.on('uploadfinish', this._onUploadFinish, this);
	},

	destroy : function() {
		// TODO implement
	}

});

Ext.ux.jnap.upload.UploadStatus = {

	QUEUED : 1,

	UPLOADING : 2,

	FAILED : 3,

	DONE : 4,

	CANCELLED : 5
};

/**
 * @class Ext.ux.jnap.upload.UploadQueue
 * @extends Object
 * 
 * @constructor
 * Creates a new queue.
 * @param {Ext.ux.jnap.upload.Uploader} uploader
 */
Ext.ux.jnap.upload.UploadQueue = Ext.extend(Object, {

	constructor : function(uploader) {
		Ext.ux.jnap.upload.UploadQueue.superclass.constructor.call();
		this.uploader = uploader;
		this.files = new Ext.util.MixedCollection(false, function(file) {
			return file.getId();
		});
	},

	files : new Ext.util.MixedCollection(),

	uploader : undefined,

	/**
	 * TODO docme
	 * @param {Ext.ux.jnap.upload.UploadFile} file
	 */
	addFile : function(file) {
		var _me = this;
		if (_me.uploader.fireEvent('beforefileadd', _me.uploader, _me, file) !== false) {
			_me.files.add(file);
			_me.uploader.fireEvent('fileadded', _me.uploader, _me, file);
			_me.uploader.fireEvent('queuechanged', _me.uploader, _me, file);
		}
	},

	/**
	 * TODO docme
	 * @param {UploadFile} file
	 */
	removeFile : function(file) {
		var _me = this;
		if (_me.uploader.fireEvent('beforefileremove', _me.uploader, _me, file) !== false) {
			_me.files.remove(file);
			_me.uploader.fireEvent('fileremoved', _me.uploader, _me, file);
			_me.uploader.fireEvent('queuechanged', _me.uploader, _me, file);
		}
	},

	contains : function(file) {
		return this.files.contains(file);
	},

	/**
	 * TODO docme
	 */
	clear : function() {
		var _me = this;
		var allFiles = _me.files;
		allFiles.each(function(file, i, length) {
			_me.removeFile(file);
		});
	},

	countByStatus : function(status) {
		return this.files.filter('status', status).length;
	},

	/**
	 * TODO docme
	 * @return {Boolean} TODO
	 */
	isEmpty : function() {
		return !this.files || this.files.getCount() == 0;
	},

	/**
	 * TODO docme
	 * @param {String} id File id
	 * @return {Ext.ux.jnap.upload.UploadFile} Gets a reference to the {@link Ext.ux.jnap.upload.UploadFile}
	 * with the provided id. If there is no file with such id returns <tt>undefined</tt>.
	 */
	getFile : function(id) {
		return this.file.get(id);
	},

	getLength : function() {
		return this.files.length;
	},

	getTotalSize : function() {
		var totalSize = 0;
		this.files.each(function(file, i, length) {
			totalSize += file.getSize();
		});
		return totalSize;
	},

	getFormattedTotalSize : function() {
		return Ext.util.Format.fileSize(this.getTotalSize());
	},

	getNextInQueue : function() {
		return this.files.find(function(file) {
			return file.getStatus() == Ext.ux.jnap.upload.UploadStatus.QUEUED;
		});
	},

	/**
	 * TODO docme
	 * @return {Boolean}
	 */
	isDone : function() {
		var result = this.files.find(function(file) {
			return file.getStatus() != Ext.ux.jnap.upload.UploadStatus.DONE;
		});
		return result == null;
	},

	/**
	 * TODO docme
	 * @return {Boolean}
	 */
	hasErrors : function() {
		var result = Ext.partition(this.files, function(file) {
			return file.getStatus() === Ext.ux.jnap.upload.UploadStatus.FAILED;
		});
		return result[0].length > 0;
	},

	getUploadingCount : function() {
		return this.files.filterBy(function(file) {
			return file.getStatus() === Ext.ux.jnap.upload.UploadStatus.UPLOADING;
		}, this).getCount();
	},

	/**
	 * TODO docme
	 * @return {Boolean}
	 */
	isUploading : function() {
		return this.files.find(function(file) {
				return file.getStatus() === Ext.ux.jnap.upload.UploadStatus.UPLOADING;
			}, this) != null;
	},

	/**
	 * TODO docme
	 * @return {Boolean}
	 */
	isPending : function() {
		return this.files.find(function(file) {
				return file.getStatus() === Ext.ux.jnap.upload.UploadStatus.QUEUED;
			}, this) != null;
	}
});

/**
 * @class Ext.ux.jnap.upload.UploadFile
 * @extends Object
 */
Ext.ux.jnap.upload.UploadFile = Ext.extend(Object, {

	nativeRef : undefined,

	constructor : function(id, name, size, nativeRef) {
		this.id = id;
		this.name = name;
		this.size = size;
		this.status = Ext.ux.jnap.upload.UploadStatus.QUEUED;
		this.nativeRef = nativeRef;
	},

	getId : function() {
		return this.id;
	},

	getName : function() {
		return this.name;
	},

	getExtension : function() {
		var nm = this.name;
		var extension = undefined;
		if (nm && nm.lastIndexOf('.') != -1) {
			extension = nm.substring(nm.lastIndexOf('.'));
		}
		return extension;
	},

	getSize : function() {
		return this.size;
	},

	getFormattedSize : function() {
		return this.size ? Ext.util.Format.fileSize(this.size) : 'Unknown';
	},

	getStatus : function() {
		return this.status;
	},

	setStatus : function(status) {
		this.status = status;
	}

});
Ext.ns('Ext.ux.jnap.upload');

/**
 * @class Ext.ux.jnap.upload.FlashProvider
 * @extends Ext.ux.jnap.upload.UploadProvider
 */
Ext.ux.jnap.upload.FlashProvider = Ext.extend(Ext.ux.jnap.upload.UploadProvider, {

	/**
	 * @type String
	 */
	alias : 'flash',

	/**
	 * @cfg {String} baseDir
	 */
	baseDir : '/jnap-showcase/swfupload/',

	/**
	 * @cfg {String} flashSrc
	 */
	flashSrc : 'swfupload.swf',

	/**
	 * @cfg {String} jsSrc
	 */
	jsSrc : 'swfupload.js',

	/**
	 * @type SWFUpload
	 */
	_swfupload : undefined,

	_filesMap : new Ext.util.MixedCollection(),

	getFeatures : function() {
		return Ext.apply(Ext.ux.jnap.upload.FlashProvider.superclass.getFeatures.call(), {
			chunks : false,
			dnd : false,
			multipart : true,
			progress : true
		});
	},

	init : function(uploader) {
		Ext.ux.jnap.upload.FlashProvider.superclass.init.call(this, uploader);
		try {
			this._loadScript();
			this._initSWFUpload();
			return true;
		} catch (e) {
			return false;
		}
	},

	// private
	_loadScript : function() {
		if (!this._isSwfUploadDefined()) {
			var xhr = Ext.ux.jnap.util.ExtUtils.createXhrObject();
			// sync request, it'll block until it's done
			xhr.open('GET', this.baseDir + this.jsSrc, false);
			xhr.send('');
			if (xhr.status == 200 && xhr.responseText) {
				// insert the script content as a body of the script tag
				Ext.getHead().createChild({
					tag : 'script',
					type : 'text/javascript',
					html : xhr.responseText
				});
			}
			xhr = null;
			delete xhr;
		}
	},

	// private
	_initSWFUpload : function() {
		if (this._isSwfUploadDefined()) {
			this.browseFilesTriggerEl = Ext.ux.jnap.util.ExtUtils.createOverlay(
				Ext.get(this.uploader.browseFilesTriggerEl));
			this.bindTriggerEvents(this.browseFilesTriggerEl);
			this._swfupload = new SWFUpload({
				debug : false,
				flash_url : this.baseDir + this.flashSrc,
				upload_url : this.uploader.url,
//				file_size_limit : this.uploader.maxFileSize + ' B',
				file_types : this.uploader.acceptedTypes || [],
//				file_types_description : this.flashSwfUploadFileTypesDescription,
//				file_upload_limit : 100,
				file_queue_limit : this.uploader.maxQueueSize,
//				post_params : this.extraPostData,
//				button_image_url : this.flashButtonSprite,
				button_placeholder : this.browseFilesTriggerEl.createChild().dom,
				button_height : this.browseFilesTriggerEl.getHeight(),
				button_width : this.browseFilesTriggerEl.getWidth(),
				button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
				file_post_name : this.uploader.fileNameParam,
//				file_dialog_complete_handler : this.swfUploadFileDialogComplete.createDelegate(this),
				file_queued_handler : this._onFileQueued.createDelegate(this),
//				upload_complete_handler : this.swfUploadComplete.createDelegate(this),
				upload_error_handler : this._onUploadError.createDelegate(this),
				upload_progress_handler : this._onUploadProgress.createDelegate(this),
				upload_success_handler : this._onUploadSuccess.createDelegate(this),
//				upload_start_handler : this.swfUploadUploadStart.createDelegate(this),
//				file_queue_error_handler : this.swfUploadFileQueError.createDelegate(this),
				minimum_flash_version : '9.0.28'
			});
		} else {
			throw String.format('[Ext.ux.jnap.upload.FlashProvider] The "SWFUpload" object is not '
				+ 'available. Make sure you have the swfupload script at the right location: "{0}"',
				(this.baseDir + this.jsSrc));
		}
	},

	_isSwfUploadDefined : function() {
		try {
			return Ext.isFunction(SWFUpload);
		} catch(e) {
			return false;
		}
	},

	onUpload : function(file) {
		this._swfupload.startUpload(file.nativeRef.id);
	},

	onCancel : function(file) {
		this._swfupload.cancelUpload(file.nativeRef.id);
	},

	toUploadFile : function(nativeFile) {
		return new Ext.ux.jnap.upload.UploadFile(Ext.id(nativeFile.name),
			nativeFile.name, nativeFile.size, nativeFile);
	},

	_onFileQueued : function(nativeFile) {
		var file = this.toUploadFile(nativeFile);
		this.uploader.queue.addFile(file);
		this._filesMap.add(nativeFile.id, file);
	},

	_onUploadProgress : function(nativeFile, loadedSize, totalSize) {
		this.uploader.fireEvent('uploadprogress', this.uploader, this,
			this._filesMap.get(nativeFile.id), loadedSize,
			(loadedSize / totalSize), totalSize);
	},

	_onUploadSuccess : function(nativeFile, serverData, responseReceived) {
		this.uploader.fireEvent('uploadsuccess', this.uploader, this,
			this._filesMap.get(nativeFile.id), serverData);
		this._onUploadComplete(nativeFile, 200, serverData);
	},

	_onUploadError : function(nativeFile, errorCode, msg) {
		var serverData = {};
		this.uploader.fireEvent('uploaderror', this.uploader, this,
			this._filesMap.get(nativeFile.id), serverData);
		this._onUploadComplete(nativeFile, 400, serverData);
	},

	_onUploadComplete : function(nativeFile, statusCode, response) {
		var file = this._filesMap.removeKey(nativeFile.id);
		this.uploader.fireEvent('uploadfinish', this.uploader, this, file, statusCode, response);
	}

});
/**
 * @class Ext.ux.jnap.upload.Html5Provider
 * @extends Ext.ux.jnap.upload.UploadProvider
 */
Ext.ux.jnap.upload.Html5Provider = Ext.extend(Ext.ux.jnap.upload.UploadProvider, {

	/**
	 * @cfg {String} alias
	 * The alias for this provider is 'html5' and should not be changed.
	 */
	alias : 'html5',

	dropElement : undefined,

	requestPool : new Ext.util.MixedCollection(),

	/**
	 * @cfg {Object} requestConfig
	 */
	requestConfig : {
		contentTypeHeader : 'text/plain; charset=x-user-defined-binary',
		fileNameHeader : 'X-File-Name'
	},

	init : function(uploader) {
		Ext.ux.jnap.upload.Html5Provider.superclass.init.call(this, uploader);
		var xhr = Ext.ux.jnap.util.ExtUtils.createXhrObject();
		var xhrUploadSupport = !!(xhr.upload || xhr.sendAsBinary);
		if (xhrUploadSupport) {
			this._loadFeatures(xhr);
			if (this.uploader.dropContainerEl && this.getFeatures().dnd) {
				this._configDropContainer();
			}
		}
		xhr = null;
		delete xhr;
		this._createInputOverlay.defer(100, this);
		return xhrUploadSupport;
	},

	getFeatures : function() {
		return this._features;
	},

	_loadFeatures : function(xhr) {
		var hasFileApiSupport = !!File;

		this._features = Ext.ux.jnap.upload.Html5Provider.superclass.getFeatures.call(this);
		Ext.apply(this._features, {
			chunks : false,
			dnd : !!(hasFileApiSupport && File.prototype.slice) || window.mozInnerScreenX !== undefined,
			multipart : !!(hasFileApiSupport && File.prototype.getAsDataURL),
			progress : !!xhr.upload
		});		
	},

	onUpload : function(file) {
		var xhrup = new Ext.ux.jnap.upload.Xhr2Upload(Ext.apply(this.requestConfig || {}, {
			url : this.uploader.url,
			fileNameParam : this.uploader.fileNameParam
		}));
		xhrup.on('uploadprogress', function(event) {
			this.uploader.fireEvent('uploadprogress', this.uploader, this, file,
				event.loaded, (event.loaded / event.total), event.total);
		}, this);
		xhrup.on('load', function(event) {
			var xhr = xhrup.xhr;
			var status = xhr.status;
			var response = xhr.responseText || xhr.responseXml;
			if (status >= 200 && status < 300) {
				this.uploader.fireEvent('uploadsuccess', this.uploader, this, file, response);
			} else {
				this.uploader.fireEvent('uploaderror', this.uploader, this, file, response);
			}
			// TODO clean requests
//			var req = this.requestPool.removeKey(file.getId());
//			req = null;
//			delete req;
			this.uploader.fireEvent('uploadfinish', this.uploader, this, file, status, response);
		}, this);
		this.requestPool.add(file.getId(), xhrup);
		xhrup.upload(file.nativeRef);
	},

	onCancel : function(file) {
		var reqpool = this.requestPool;
		var fileId = file.getId();
		if (reqpool.containsKey(fileId)) {
			var xhr = reqpool.get(fileId);
			xhr.abort();
			reqpool.removeKey(fileId);
			xhr = null;
			delete xhr;
		}
	},

	toUploadFile : function(nativeFile) {
		return new Ext.ux.jnap.upload.UploadFile(Ext.id(nativeFile.name),
			nativeFile.name, nativeFile.fileSize || nativeFile.size, nativeFile);
	},

	_createInputOverlay : function() {
		var el = this.uploader.browseFilesTriggerEl;
//		var wrap = this._fileInputWrap = el.wrap({
//			cls : 'x-form-field-wrap ' + this.uploader.baseCls + '-wrap'
//		});
		var overlay = this._fileInputOverlay = Ext.ux.jnap.util.ExtUtils.createOverlay(el, {
			cls : this.uploader.baseCls + '-wrap'
		});
//		var input = this._fileInput = wrap.createChild({
		var input = this._fileInput = overlay.createChild({
			tag : 'input',
			type : 'file',
			cls : this.uploader.baseCls + '-input-file',
			multiple : !!this.uploader.multiple,
			size : 1
		});
		input.setOpacity(0);
		input.on('change', function(evt, inputFile) {
				this._addSelectedFiles(inputFile.files || []);
			}, this);
//		this.bindTriggerEvents(el);
		this.bindTriggerEvents(overlay);
	},

	_addSelectedFiles : function(files) {
		for (var i = 0; i < files.length; i++) {
			this.uploader.queue.addFile(this.toUploadFile(files[i]));
		}
	},

	_resizeDropContainer : function(parent) {
		var m = this.dropElement.getMargins();
		this.dropElement.setSize(parent.getWidth() - (m.left + m.right),
			parent.getHeight() - (m.top + m.bottom));
	},

	_configDropContainer : function() {
		var dropContainer = Ext.get(this.uploader.dropContainerEl);
		var drop = this.dropElement = dropContainer.createChild({
			cls : this.uploader.baseCls + '-drop-container',
			html : String.format('<p>{0}</p>', this.uploader.dropHintText)
		});
		drop.setVisibilityMode(Ext.Element.VISIBILITY);
		this._resizeDropContainer(dropContainer);
		dropContainer.on('resize', function(event, el, obj) {
			this._resizeDropContainer(Ext.get(el));
		}, this);
		var body = Ext.getBody();
		body.on('dragenter', function(event) {
			this.dropElement.setVisible(true);
		}, this);
		body.on('dragleave', function(event) {
			this.dropElement.setVisible(false);
		}, this);
		drop.on('dragover', function(event) {
			event.browserEvent.dataTransfer.dropEffect = 'move';
			event.preventDefault();
		}, this);
		drop.on('drop', function(event) {
			event.preventDefault();
			this._addSelectedFiles(event.browserEvent.dataTransfer.files || []);
			this.dropElement.setVisible(false);
		}, this);
	}

});

/**
 * 
 * @class Ext.ux.jnap.upload.Xhr2Upload
 * @extends Ext.util.Observable
 */
Ext.ux.jnap.upload.Xhr2Upload = Ext.extend(Ext.util.Observable, {

	/**
	 * @cfg {String} contentTypeHeader
	 */
	contentTypeHeader : 'text/plain; charset=x-user-defined-binary',

	/**
	 * @cfg {String} fileNameHeader
	 */
	fileNameHeader : 'X-File-Name',

	/**
	 * @cfg {String} fileNameParam
	 */
	fileNameParam : 'fileName',

	/**
	 * @cfg {Boolean}
	 */
	sendMultiPartFormData : false,

	xhr : undefined,

	url : 'upload/',

	fileReader : undefined,

	constructor : function(config) {
		Ext.apply(this, config || {});
		this.addEvents(
			'load',
			'loadstart',
			'loadend',
			'error',
			'progress',
			'progressabort');
	},

	upload : function(file) {
		this.xhr = Ext.ux.jnap.util.ExtUtils.createXhrObject();
		this._bindEvents();
		this.xhr.open('post', this.url, true);
		this.file = file;
		return this[Ext.isDefined(FileReader) ? '_sendFileUsingReader' : '_sendBinary'].call(this);
	},

	abort : function() {
		this.xhr.abort();
	},

	_sendBinary : function() {
		this.xhr.overrideMimeType(this.contentTypeHeader);
		this.xhr.setRequestHeader(this.fileNameHeader, this.file.name);
		this.xhr.send(this.file);
		return true;
	},

	// protected
	_sendFileUsingReader : function() {
		this.fileReader = new FileReader();
		this.fileReader.readAsBinaryString(this.file);
		this.fileReader['onload'] = this._sendMultipartRequest.createDelegate(this);
		return true;
	},

	// protected
	_sendMultipartRequest : function() {
		var lf = '\r\n',
			boundary = 'jnap-ui-html5-upload-' + new Date().getTime(),
			blob = '';

		// The RFC2388 blob (http://www.ietf.org/rfc/rfc2388.txt)
		blob += String.format('--{0}{1}Content-Disposition: form-data; name="{2}"; filename="{3}"{1}'
			+ 'Content-Type:{4}{1}Content-Transfer-Encoding: base64{1}{1}{5}{1}--{0}--{1}{1}',
			boundary, lf, this.fileNameParam, this.file.name,
			this.file.type, window.btoa(this.fileReader.result));

		this.xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
		this.xhr.send(blob);
//		this.xhr.sendAsBinary ? this.xhr.sendAsBinary(blob) : this.xhr.send(blob);
	},

	_readBinaryFile : function() {
		return this.file.getAsBinary ? this.file.getAsBinary() : window.btoa(this.fileReader.result);
	},

	_bindEvents : function() {
		Ext.each(['loadstart', 'load', 'loadend', 'progress', 'progressabort', 'error'],
			function(eventName, index, events) {
				this.xhr.addEventListener(eventName, this._delegateEvent.createDelegate(this), false);
				this.xhr.upload.addEventListener(eventName, this._delegateUploadEvent.createDelegate(this), false);
		}, this);
	},

	// private
	_delegateEvent : function(event) {
		this.fireEvent(event.type, event);
	},

	// private
	_delegateUploadEvent : function(event) {
		this.fireEvent('upload' + event.type, event);
	}

});
/**
 * @class Ext.ux.jnap.upload.StandardProvider
 * @extends Ext.ux.jnap.upload.UploadProvider
 */
Ext.ux.jnap.upload.StandardProvider = Ext.extend(Ext.ux.jnap.upload.UploadProvider, {

	alias: 'standard'
	
});

Ext.ns('Ext.ux.jnap.upload');

/**
 * @class Ext.ux.jnap.upload.UploadPanel
 * @extends Ext.Panel
 * @see Ext.ux.jnap.upload.Uploader
 * @xtype uploadpanel
 * 
 * @author Daniel Rochetti
 * @since 1.0
 */
Ext.ux.jnap.upload.UploadPanel = Ext.extend(Ext.Panel, {

	autoStart : true,

	browseButtonText : ['Add files...', 'Choose file'],

	cancelUploadsButtonText : 'Cancel file(s)',

	filesStatusText : ['No files yet', 'Uploaded {0} of {1} files'],

	uploaderStatusText : ['Pending', 'Uploading', 'Error', 'Done', 'Cancelled'],

	fileListHeader : {
		fileName : 'Name',
		fileSize : 'Size',
		fileProgress : 'Progress',
		fileStatus : 'Status'
	},

	maxQueueSize : 0,

	multiple : true,

	uploadCls : 'ux-upload',

	url : null,

	/**
	 * @cfg {Ext.ux.jnap.upload.Uploader} uploader
	 */
	uploader : null,

	initComponent : function() {
		this._layoutComponents();
		Ext.ux.jnap.upload.UploadPanel.superclass.initComponent.call(this);
		this.afterRender = this.afterRender.createSequence(this._initUploader, this);
	},

	/**
	 * 
	 * @return {Ext.ux.jnap.upload.Uploader}
	 */
	getUploader : function() {
		return this.uploader;
	},

	getFileStatusMessage : function(record) {
		var message = this.uploaderStatusText[record.get('status') - 1];
		if (record.get('message')) {
			message = message + ': ' + record.get('message');
		}
		return message;
	},

	_layoutComponents : function() {
		this.layout = 'fit';
		// top toolbar
		this.browseFilesButton = new Ext.Button({
			text : this.multiple ? this.browseButtonText[0] : this.browseButtonText[1],
			iconCls : this.uploadCls + '-add-files-icon'
		});
		this.cancelUploadsButton = new Ext.Button({
			text : this.cancelUploadsButtonText,
			disabled : true,
			iconCls : this.uploadCls + '-cancel-files-icon'
		});
		this.tbar = [ this.browseFilesButton, '-', this.cancelUploadsButton ];

		// files listview
		this.UploadFile = Ext.data.Record.create(['id', 'name', 'size', 'percentage', 'status', 'message']);
		this.fileStore = new Ext.data.ArrayStore({
			idIndex: 0,
			data : [],
			fields : this.UploadFile,
			storeId : this.id + '-file-store'
		});
		this.filesGrid = new Ext.grid.GridPanel({
			autoExpandColumn : 'name',
			border : false,
			store : this.fileStore,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					resizable : true,
					menuDisabled : true
	        	},
    	    columns : [{
				dataIndex : 'name',
				header : this.fileListHeader.fileName,
				id : 'name'
			}, {
				align : 'right',
				dataIndex : 'size',
				header : this.fileListHeader.fileSize,
				renderer : function(value) {
					return Ext.util.Format.fileSize(value);
				},
				width : 80
			}, {
				dataIndex : 'progress',
				header : this.fileListHeader.fileProgress,
				renderer : this._fileProgressColumnRenderer.createDelegate(this),
				width : 140
			}, {
				align : 'center',
				dataIndex : 'status',
				header : this.fileListHeader.fileStatus,
				renderer : this._fileStatusColumnRenderer.createDelegate(this),
				resizable : false,
				width : 60
			}]})
		});
		this.items = [ this.filesGrid ];

		// bottom toolbar
		this.filesStatusTextItem = new Ext.Toolbar.TextItem(this.filesStatusText[0]);
		this.bbar = [ this.filesStatusTextItem, '-' ];
	},

	_initUploader : function() {
		this.uploader = new Ext.ux.jnap.upload.Uploader({
			autoStart : this.autoStart,
			baseCls : this.uploadCls,
			browseFilesTriggerEl : this.browseFilesButton.el,
			dropContainerEl : this.filesGrid.getEl(),
			multiple : this.multiple,
			url : this.url
		});
		this.mon(this.uploader, 'beforefileadd', this._onFileAdd, this);
		this.mon(this.uploader, 'queuechanged', this._onQueueChange, this);
		this.mon(this.uploader, 'uploadstart', this._onUploadStart, this);
		this.mon(this.uploader, 'uploadprogress', this._onUploadProgress, this);
		this.mon(this.uploader, 'uploadfinish', this._onUploadFinish, this);
		this._bindBrowseButtonEvents();
	},

	_onFileAdd : function(uploader, queue, file) {
		if (!this.fileStore.getById(file.getId())) {
			this.fileStore.add(new this.UploadFile(Ext.applyIf({
				nativeRef : null,
				percentage : 0
			}, file), file.getId()));
			return true;
		}
		return false;
	},

	_onQueueChange : function(uploader, queue, file) {
		
	},

	_onUploadStart : function(uploader, provider, file, statusCode, response) {
		var record = this.fileStore.getById(file.getId());
		record.set('status', file.getStatus());
		record.commit();
	},

	_onUploadProgress : function(uploader, provider, file, loadedSize, loadedPercentage, totalSize) {
		var record = this.fileStore.getById(file.getId());
		record.set('percentage', Math.round(loadedPercentage * 100));
		record.commit();
	},

	_onUploadFinish : function(uploader, provider, file, statusCode, response) {
		var record = this.fileStore.getById(file.getId());
		record.set('percentage', 100);
		record.set('status', file.getStatus());
		record.commit();
	},

	_fileProgressColumnRenderer : function(value, metadata, record, rowindex, colindex, store) {
		var cls = this.uploadCls;
		return String.format(['<div id="{0}-progress-bar" class="{1}"><div class="{2}" ',
			'style="width: {3}%;"></div></div>'].join(''),
			record.id, cls + '-progress-bar', cls + '-progress', record.get('percentage'));
	},

	_fileStatusColumnRenderer : function(value, metadata, record, rowindex, colindex, store) {
		var cls = this.uploadCls + '-status';
		return String.format('<div id="{0}" class="{0} {0}-{1}" ext:qtip="{2}"></div>',
			cls, record.get('status'), this.getFileStatusMessage(record));
	},

	_bindBrowseButtonEvents : function() {
		this.mon(this.uploader, 'browsefilesover', function(event, el) {
			this.browseFilesButton.addClass(['x-btn-over', 'x-btn-focus']);
		}, this);
		this.mon(this.uploader, 'browsefilesout', function(event, el) {
			this.browseFilesButton.removeClass(['x-btn-over', 'x-btn-focus', 'x-btn-click']);
		}, this);
		this.mon(this.uploader, 'browsefilesclick', function(event, el) {
			this.browseFilesButton.addClass('x-btn-click');
		}, this);
	},

	onDestroy : function() {
		if (this.rendered) {
			this.uploader.destroy();
			this.uploader = null;
			delete this.uploader;
			Ext.destroyMembers(this, 'browseFilesButton', 'cancelUploadsButton', 'fileStore',
				'filesGrid', 'UploadFile');
		}
		Ext.ux.jnap.uploader.UploadPanel.superclass.onDestroy.call(this);
	}

});

// register the component xtype
Ext.reg('uploadpanel', Ext.ux.jnap.upload.UploadPanel);

