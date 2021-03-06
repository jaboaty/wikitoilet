<?php

class Toilet extends Eloquent {
	protected $guarded = array();

	public static $rules = array();

	public function set_location($id,$location){
		DB::update("update toilets set location = (GeomFromText('POINT(".$location.")')) where id = ?", array($id));
		return true;
	}
	
	public function get_toilets($latitude,$longitude){  

	//Eloquent does not provide any way of handling geospatial data
	//Create a bounding box centers around user location and provide entries within range

		$scale = 0.01;
		$latitude = floatval($latitude);
		$longitude = floatval($longitude);

		$latmin = $latitude - $scale;
		$latmax = $latitude + $scale;

		$lonmin = $longitude - $scale;
		$lonmax = $longitude + $scale;

		//Building Bounding Box
		$bounding_box = "";
		$bounding_box .= $latmin." ".$lonmin.",";
		$bounding_box .= $latmax." ".$lonmin.",";
		$bounding_box .= $latmax." ".$lonmax.",";
		$bounding_box .= $latmin." ".$lonmax.",";
		$bounding_box .= $latmin." ".$lonmin;

		//Perform Query
		$results = DB::select("select name,AsText(location) as location from toilets where Contains(GeomFromText('POLYGON((".$bounding_box."))'),location)");
		
		//Clean results
		foreach ($results as $result){
			$result->location = str_replace("POINT(","",$result->location);
			$result->location = str_replace(")","",$result->location);
			$result->location = explode(" ",$result->location);
			$result->latitude = $result->location[0];
			$result->longitude = $result->location[1];
			unset($result->location);
		}
		return $results;	
	}
}
