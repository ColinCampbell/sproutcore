// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple, Inc.  All rights reserved.
// ========================================================================

/** 
  Shadow views from top-left corner clockwise
*/
SC.SHADOW_VIEWS = [SC.View.create(SC.StaticLayout, {classNames: ['top-left-edge'], layout: { top: -6, bottom: 'auto', left: -5, right: 'auto' }}),
                   SC.View.create(SC.StaticLayout, {classNames: ['top-edge'], layout: { top: -5, bottom: 'auto', left: 0, right: 0 }}),
                   SC.View.create(SC.StaticLayout, {classNames: ['top-right-edge'], layout: { top: -6, bottom: 'auto', left: 'auto', right: -5 }}),
                   SC.View.create(SC.StaticLayout, {classNames: ['right-edge'], layout: { top: 3, bottom: 0, left: 'auto', right: -5 }}),
                   SC.View.create(SC.StaticLayout, {classNames: ['bottom-right-edge'], layout: { top: 'auto', bottom: -5, left: 'auto', right: -5 }}),
                   SC.View.create(SC.StaticLayout, {classNames: ['bottom-edge'], layout: { top: 'auto', bottom: -5, left: 5, right: 5 }}),
                   SC.View.create(SC.StaticLayout, {classNames: ['bottom-left-edge'], layout: { top: 'auto', bottom: -5, left: -5, right: 'auto' }}),
                   SC.View.create(SC.StaticLayout, {classNames: ['left-edge'], layout: { top: 3, bottom: 0, left: -5, right: 'auto' }})];

/** @class

  Most SproutCore applications need modal panels. The default way to use the 
  panel pane is to simply add it to your page like this:
  
  {{{
    SC.Panel.create({
      contentView: SC.View.extend({
        layout: { width: 400, height: 200, centerX: 0, centerY: 0 }
      })
    }).append();
  }}}
  
  This will cause your panel to display.  The default layout for a Panel 
  is to cover the entire document window with a semi-opaque background, and to 
  resize with the window.
  
  @extends SC.Pane
  @author Erich Ocean
  @since SproutCore 1.0
*/
SC.Panel = SC.Pane.extend({

  layout: { left:0, right:0, top:0, bottom:0 },
  classNames: ['sc-panel'],
  acceptsKeyPane: YES,
  isModal: true,

  // ..........................................................
  // CONTENT VIEW
  // 
  
  /**
    Set this to the view you want to act as the content within the panel.
    
    @property {SC.View}
  */
  contentView: null,
  contentViewBindingDefault: SC.Binding.single(),

  /**
    Replaces any child views with the passed new content.  
    
    This method is automatically called whenever your contentView property 
    changes.  You can override it if you want to provide some behavior other
    than the default.
    
    @param {SC.View} newContent the new panel view or null.
    @returns {void}
  */
  replaceContent: function(newContent) {
    this.removeAllChildren() ;
    if (newContent) this.appendChild(newContent) ;
  },

  /** @private */
  createChildViews: function() {
    // if contentView is defined, then create the content
    var view = this.contentView ;
    if (view) {
      view = this.contentView = this.createChildView(view) ;
      for(var i=SC.SHADOW_VIEWS.length-1; i>=0; i--) {
	      if (i==(SC.SHADOW_VIEWS.length-1)) view.appendChild(SC.SHADOW_VIEWS[i]);
	      else view.insertBefore(SC.SHADOW_VIEWS[i], SC.SHADOW_VIEWS[i+1]);
      }
      this.childViews = [view] ;
    }
  },

  
  /**
    Invoked whenever the content property changes.  This method will simply
    call replaceContent.  Override replaceContent to change how the view is
    swapped out.
  */
  contentViewDidChange: function() {
    this.replaceContent(this.get('contentView'));
  }.observes('contentView'),

  // ..........................................................
  // INTERNAL SUPPORT
  //
   
  /** @private - extends SC.Pane's method - make panel keyPane when shown */
  paneDidAttach: function() {
    var ret = sc_super();
    this.get('rootResponder').makeKeyPane(this);
    return ret ;
  },

  /** @private - suppress all mouse events on panel itself. */
  mouseDown: function(evt) { return YES; }
  
});