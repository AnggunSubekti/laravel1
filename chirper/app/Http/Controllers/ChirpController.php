<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
//use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response;

class ChirpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {

	//    return response('Hello World!');
	 
        return Inertia::render('Chirps/Index', [
		//
		'chirps' => Chirp::with('user:id,name')->latest()->get(),
	]);
	
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        //
        $validated = $request->validate([
		'message' => 'required|string|max:255',
		'media' => 'nullable|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:102400', // validasi untuk media (gambar atau video)
	]);
	
	// Menyimpan media jika ada
    	$mediaPath = null;
    	if ($request->hasFile('media')) {

		// Cek apakah file ada
    		//dd($request->file('media'));//debug file yang diupload
		
		$media = $request->file('media');

        	// Tentukan folder untuk menyimpan file media
        	//$mediaPath = $media->store('media', 'public'); // Gambar atau video disimpan di folder storage/public/media

		// Jika media berupa video, kita bisa juga membuat thumbnail atau metadata jika perlu

		// Cek apakah file berhasil diupload
    		if ($media->isValid()) {
        		$mediaPath = $media->store('media', 'public');
    		} else {
        	        dd('File upload failed');
    		}
    	}
	
	// Ambil hashtag dari message (jika ada)
	preg_match_all('/#(\w+)/', $validated['message'], $matches);
    	$hashtags = implode(',', $matches[1]); // Gabungkan hashtag menjadi string yang dipisahkan koma

 
        $request->user()->chirps()->create([
        'message' => $validated['message'],
        'media' => $mediaPath,
        'hashtags' => $hashtags,]);
 	
	//dd($chirp); // Debug data chirp yang disimpan

        return redirect(route('chirps.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Chirp $chirp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chirp $chirp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chirp $chirp): RedirectResponse
    {
        Gate::authorize('update', $chirp);
 
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
 
        $chirp->update($validated);
 
        return redirect(route('chirps.index'));
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Chirp $chirp): RedirectResponse
    {
        //
        Gate::authorize('delete', $chirp);
 
        $chirp->delete();
 
        return redirect(route('chirps.index'));
    }
}
