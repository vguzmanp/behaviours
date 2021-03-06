/**
 */

(function(){
var lua_configure = function(){
  this.configureDialogSetup()

  var tr=$('<tr>')
  var table=$('<table>').append(tr)
  var code=$('<textarea rows="20" id="code">')
  
  if (this.params.code)
    code.val(this.params.code)
    
//   if (this.params.exec)
//     code.val(this.params.exec)
//   if (this.params.check)
//     code.val(this.params.check)
    
  var cheat_sheet=$('<ul>')
	var state=main.behaviour.state
  for (var s in state){
    cheat_sheet.append($('<li>').html(s+'<a class="type" onclick="loadHelp(\''+state[s].type+'\')" href="#">'+state[s].type+'</span>'))
  }
  
  tr.append($('<td style="vertical-align: top;">').append(code))
  tr.append($('<td class="cheatsheet">').append("<h3>"+current_language.current_objects+"</h3>").append(cheat_sheet))
  
  $('#dialog #content').html(table)
 	
	var editor
	this.editor = CodeMirror.fromTextArea(code[0], {
		tabMode: "indent",
		matchBrackets: true,
		theme: "lesser-dark",
		extraKeys: {
				"F10": function() {
					$('.CodeMirror').toggleClass('CodeMirror-fullscreen')
					editor.refresh()
				},
				"Esc": function() {
					$('.CodeMirror').removeClass('CodeMirror-fullscreen')
					editor.refresh()
				}
		}
	});
	
	var editor=this.editor
	$(editor).focus()
	
	$(editor).find('.CodeMirror-scroll').attr('height: 100%;')
}

lua_accept_configure = function(){
  this.params['code']=this.editor.getValue()
  this.update()
}

var LUAAction=extend(Action, {paramOptions: [{type:Text,text:current_language.lua_action_msg,name:'code'}]})
var LUAEvent=extend(Event, {paramOptions: [{type:Text,text:current_language.lua_event_msg,name:'code'}]})

LUAAction.prototype.configure=lua_configure
LUAAction.prototype.acceptConfigure=lua_accept_configure


LUAEvent.prototype.configure=lua_configure
LUAEvent.prototype.acceptConfigure=lua_accept_configure

main.behaviour.nodeFactory.add('lua_action',LUAAction)
main.behaviour.nodeFactory.add('lua_event',LUAEvent)
})()
