<?php

class ToiletsController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()  //Returns JSON FEED of All items with in range of user latitude and longitutde
	{
        //return View::make('toilets.index');

		$input = Input::all();

		$toilet = new Toilet;
		if($results = $toilet->get_toilets($input['latitude'],$input['longitude'])){
			return Response::json($results);	
		}else{
			return "no results";
		}
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{




        //return View::make('toilets.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()  //Creates a new Location and saves to Database
	{


		$input = Input::all();

		$toilet = new Toilet;
	    
	    $toilet->name = $input['name'];
	  	$toilet->save();

	    if( !$toilet->set_location($toilet->id,$input['latitude']." ".$input['longitude']) ){
	    	$toilet->delete();
	    	return Response::json('Location failed', 200);
	    }
	    

		return Response::json('Location Created', 200);

	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        return View::make('toilets.show');
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
        return View::make('toilets.edit');
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
