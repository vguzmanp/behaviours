#include "server/eventQueue.h"
#include <json/json_object_private.h>

EventQueue::EventQueue(){
}

void EventQueue::pushEvent(const std::string &type, json_object &obj){
	json_object *jobj = json_object_new_object();
	json_object *jstring = json_object_new_string(type.c_str());

	json_object_object_add(jobj,"type", jstring);
	json_object_object_add(jobj,"obj", &obj);
	queue.add(jobj);
}

json_object* EventQueue::getEvents(int id){
	std::vector<json_object> events;

	queue.read(id,events);

	json_object *jobj = json_object_new_object();
	json_object *jarray = json_object_new_array();

	for (std::vector<json_object>::iterator it = events.begin() ; it != events.end(); ++it)
		json_object_array_add(jarray,&(*it));

	json_object_object_add(jobj,"messages", jarray);
	return jobj;
}


std::string EventQueue::test(){
	json_object *jobj = json_object_new_object();
	json_object *jstring = json_object_new_string("HOLA");

	json_object_object_add(jobj,"MENSAJE", jstring);

	pushEvent("MSG", *jobj);
	return json_object_to_json_string(getEvents(0));

}