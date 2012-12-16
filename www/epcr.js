var jQT = $.jQTouch({
	icon: 'epcr2.png',
	statusBar: 'black',
	preloadImages: [
        'themes/jqt/img/back_button_clicked.png',
        'themes/jqt/img/button_clicked.png'
        ]
});

//Define the Version
var release = '1.0.6';

//Coordinates
var moved;

var db;
var cpr_counter=0;
var time;
var timer_is_on=false;
var pictureSource;   // picture source
var currentPicture;  // <img> id
var pictureSuccess = false;
var destinationType; // sets the format of returned value 
var canvasWidth = 290;
var canvasHeight = 100;
var context;
var signaturePath = '';
var practitionerSignaturePath = '';
var patientSignaturePath = '';
var hospReprSignaturePath = '';
var witnessSignaturePath = '';
var currentSig;
var bodyType = 'adult';
// Load list of complaints
var complaints_list = ["Abdominal Pain", "Angina", "Angina (Unstable)", "Angina (Stable)", "Alcohol With-drawl", "Allergic Reaction", "Altered mental Status", "Anaphylaxis", "Bradycardia", "Burn", "Cardiac Arrest", "Cerebrovascular Accident (CVA)", "Chest Pain (Cardiac)", "Chest Pain (Non-Cardiac)", "Chest Pain Not Yet Diagnosed", "Child Delivery", "Croup", "Death", "Dehydration", "Ectopic Pregnancy", "Epidural Bleed", "Epiglottitis", "Food Poisoning", "Hypertensive Crisis", "Hypertensive Emergency", "Hyperthermia", "Hypoglycemia", "Hypotension", "Hypothermia", "Labor", "Major Trauma", "Musculoskeletal Trauma", "Nausea", "Near Drowning", "Obstructed Airway", "Overdose", "Palpitations", "Pelvic Pain", "Poisoning", "Pregnancy Complications", "Psychiatric Emergency", "Rape", "Respiratory Arrest", "Seizure", "Sexual Abuse", "Shock", "Sickle Cell Crisis", "SIDS", "Smoke Inhalation", "Spinal Cord Injury", "Subdural Bleed", "Syncope", "Tachycardia", "Transient Ischemic Attacks (TIA)", "Unconscious/Unknown", "Vaginal Bleeding", "Vomiting"];
var listOfAllergies = ["Anticonvulsants", "Aspirin", "Ibuprofen", "Iodine", "Insulin", "IV contrast dye", "Lidocaine", "Naproxen", "Novocaine", "Penicillin", "Sulfa drugs", "NKDA", "NKDA per staff", "NKDA per parent/guardian"];
var cvs = ["A-Fib","A-Flutter","Acute Coronary Syndrome (ACS)","Acute Myocardial Infarction (AMI)","Angina ","Angina (Unstable)","Aortic Dissection","Aortic Stenosis","Ascites","Atherosclerosis","Atrial Tach","Cardiac Arrhythmia","Cardiomegaly (enlarged heart)","Congenital heart disease","Congestive Heart Failure (CHF)","Coronary Artery Disease (CAD)","Deep Vein Thrombosis","Dyslipidemia","Endocarditis","Heart Failure (Left)","Heart Failure (Right)","Heart Murmur","Hyperlipidemia","Hypertension (HTN)","Left Ventricular Hypertrophy (LVH)","Mitral Valve Prolapse","Myocarditis","Pacemaker (AV)","Pacemaker (Ventricular)","Pacemaker (Wandering Atrial)","Palpitations","Parox Suprav Tachy (PSVT)","Pericardial Effusion","Pericardial Tamponade","Pericarditis","Peripheral Vascular Disease","PVCs","Rheumatic Heart Disease","V-Tach","Valvular heart disease"];
var resp = ["Asthma","Bronchitis","Chron Obstr Pulmon Dis (COPD)","Chronic Cough","Cold","Croup","Cystic Fibrosis","Emphysema","H1N1","Hantavirus","Influenza/Flu","Lung Cancer","Pleurisy","Pneumonia","Pneumothorax","Pulmonary Embolus","Pulmonary Fibrosis","Respir Distress Syndrome (RDS)","Respiratory Syncytial Virus (RSV)","Sarcoidosis","Sleep Apnea","Sudden Infant Death Syn (SIDS)","Swine Flu","Tobacco Use (Current)","Tobacco Use (Hx)","Tuberculosis (TB)"];
var gugi = ["Abdominal Adhesions","Acid Reflux","Appendectomy","Appendicitis","Autosom Dom Polycys Kidney Dis","Bacterial Vaginosis","Barrett's Esophagus","Benign Prost Hypertrophy/plasia","Bladder Infection","Bowel Incontinence","Celiac Disease","Chancroid","Chlamydia","Cholecystect (Gallbladder Rem)","Chronic Kidney Disease","Cirrhosis","Colon Polyps","Constipation","Crohn's Disease","Cystic Kidney Disease","Cystitis","Diarrhea","Diverticulosis / Diverticulitis","Duodenal Ulcer","Ectopic Kidney","Emodialysis","End Stage Renal Disease","Erectile Dysfunction (ED)","Fallen Bladder","Food Poisoning","Gallstones","Gastritis","Gastroesoph Refl Dis (GERD)","Genital Herpes","Genital Warts","Gonorrhoea","Goodpasture's Syndrome","Heartburn","Hematuria / Blood in Urine","Hemorrhoids","Hepatitis A","Hepatitis B","Hepatitis C","Hernia","Hiatal Hernia","Hypertension","Ileostomy / Colostomy","Inflammatory Bowel Disease","Inguinal Hernia","Irritable Bowel Syndrome","Lactose Intolerance","Nephrotic Syndrome","Painful Bladder Syndrome","Pancreatitis","Pelvic Inflammatory Disease (PID)","Polycystic Kidney Disease (PKD)","Proctitis","Prostate Cancer","Proteinuria","Pubic Lice (Crabs)","Pyelonephritis (Ren/Kidn Inf)","Renal / Kidney Cysts","Renal / Kidney Failure","Renal / Kidney Stones","Renal / Kidney Transplant","Renal Artery Stenosis (RAS)","Renal Dysplasia","Renal Tubular Acidosis (RTA)","Scabies","Stomach Flu","Stomach Ulcers","Syphillis","Thrush (Candiada)","Trichomoniasis","Ulcer","Urethritis","Urinary Incontinence","Urinary Retention","Urinary Tract Infection (UTI)","Whipple's Disease","Wilson's Disease"];
var neuro = ["Acute Dissem encephalomy","Agnosia","Alternating hemiplegia","Alzheimer's disease","Anoxia","Aphasia","Apraxia","Arachnoid cysts","Arachnoiditis","Arteriovenous malformation","Atten Deficit Hyperactiv Dis","Auditory processing disorder","Autonomic Dysfunction","Back Pain","Bell's palsy","Benign Intracranial Hypertension","Brachial plexus injury","Brain abscess","Brain damage","Brain injury","Brain tumor","Brown-Sequard syndrome","Carpal tunnel syndrome","Central pain syndrome","Central pontine myelinolysis","Centronuclear myopathy","Cephalic disorder","Cerebral aneurysm","Cerebral arteriosclerosis","Cerebral atrophy","Cerebral gigantism","Cerebral palsy","Cerebral vasculitis","Cervical spinal stenosis","Chorea","Chronic fatigue syndrome","Chron inflam demy polyneuro","Chronic pain","Coma","Compression neuropathy","Corticobasal degeneration","Cranial arteritis","Creutzfeldt-Jakob disease","Cushing's syndrome","Dementia","Dermatomyositis","Developmental dyspraxia","Diabetic neuropathy","Diffuse sclerosis","Dyslexia","Dystonia","Encephalitis","Epilepsy","Erythromelalgia","Essential tremor","Fainting","Febrile seizures","Fibromyalgia","Gray matter heterotopia","Head injury","Headache","Herpes zoster oticus","Herpes zoster","Huntington's disease","Hydranencephaly","Hydrocephalus","Hypoxia","Immune-Mediated encephalomye","Infantile spasms","Inflammatory myopathy","Intracranial cyst","Intracranial hypertension","Learning disabilities","Locked-In syndrome","Lou Gehrig's dis (Motor Neur Dis)","Lumbar disc disease","Lumbar spinal stenosis","Lyme dis-Neurological Sequelae","Menieres disease","Meningitis","Menkes disease","Microcephaly","Micropsia","Migraine","Mini-stroke (trans isch att)","Mitochondrial myopathy","Mobius syndrome","Monomelic amyotrophy","Motor Neurone Disease","Motor skills disorder","Multi-infarct dementia","Multifocal motor neuropathy","Multiple sclerosis","Multiple system atrophy","Muscular dystrophy","Myasthenia gravis","Myelinoclastic diffuse sclerosis","Myoclonic Encephalopathy","Myoclonus","Myopathy","Narcolepsy","Neuroleptic malignant syndrome","Neuromyotonia","Nonverbal learning disorder","Occipital Neuralgia","Optic neuritis","Orthostatic Hypotension","Palinopsia","Paresthesia","Parkinson's disease","Peripheral neuropathy","Persistent Vegetative State","Pervasive developmental disorders","Photic sneeze reflex","Pinched nerve","Pituitary tumors","PMG","Polio","Polymicrogyria","Polymyositis","Porencephaly","Post-Polio syndrome","Postherpetic Neuralgia (PHN)","Postinfectious Encephalomyelitis","Postural Hypotension","Primary Lateral Sclerosis","Rabies","Reflex neurovascular dystrophy","Repetitive motion disorders","Repetitive stress injury","Restless legs syndrome","Rhythmic Movement Disorder","Sandhoff disease","Schizophrenia","Septo-optic dysplasia","Shaken baby syndrome","Shingles","Sleep apnea","Sleeping sickness","Spina bifida","Spinal cord injury","Spinal cord tumors","Spinal muscular atrophy","Spinocerebellar ataxia","Stroke","Syncope","Synesthesia","Tarsal tunnel syndrome","Temporal arteritis","Tetanus","Tourette syndrome","Toxic encephalopathy","Transient ischemic attack","Transverse myelitis","Traumatic brain injury","Tremor","Whiplash","Wilson's disease"];
var endocrine = ["Acromegaly / Gigantism","Addison's disease","Adrenal insufficiency","Adrenocortical carcinoma","Amenorrhea","Androgen insensitivity syndromes","Carcinoid syndrome","Conn's syndrome","Cushing's disease","Cushing's syndrome","Delayed puberty","Diabetes insipidus","Diabetes","Gender identity disorder","Gestational Diabetes","Glucagonoma","Goitre","Gonadal dysgenesis","Graves-Basedow disease","Hashimoto's thyroiditis","Hermaphroditism","Hyperthyroidism","Hypoglycemia","Hypogonadism (Gonadotropin def)","Hypoparathyroidism","Hypopituitarism","Hypothyroidism","Mature Onset Diab of Y (MODY)","Mineralocorticoid deficiency","Multiple endocrine neoplasia","Osteitis deform (Paget bone Dis)","Osteoporosis","Ovarian failure (Premature Menop)","Pituitary adenomas","Pituitary tumors","Polycystic ovary syndrome","Precocious puberty","Primary hyperparathyroidism","Prolactinoma","Pseudohypoparathyroidism","Rickets and osteomalacia","Secondary hyperparathyroidism","Tertiary hyperparathyroidism","Testicular failure","Thyroid cancer","Thyroidectomy","Thyroiditis","Toxic multinodular goitre","Type 1 Diabetes mellitus","Type 2 Diabetes mellitus"];
var psych = ["Acute stress disorder","Adjustment disorder","Amnesia","Anorexia nervosa","Antisocial personality disorder","Anxiety disorder","Asperger syndrome","Attention deficit disorder","Autism","Autophagia","Avoidant personality disorder","Bereavement","Binge eating disorder","Bipolar disorder","Borderline personality disorder","Bulimia nervosa","Cyclothymia","Delirium","Delusional disorder","Dementia","Dependent personality disorder","Depression","Dissociative identity disorder","Down syndrome","Dyslexia","Dyspraxia","Exhibitionism","Gender identity disorder","Generalized anxiety disorder","Hyperactivity disorder","Hyperkinetic syndrome","Hypochondriasis","Hysteria","Kleptomania","Mania","Munchausen syndrome","Narcissistic personality disorder","Narcolepsy","Nightmares","Obsessive-compuls perso dis","Obsessive-compulsive disorder","Pain disorder","Panic attacks","Paranoid personality disorder","Parasomnia","Pathological gambling","Perfectionism","Pervasive developmental disorder","Post-traumatic stress disorder","Postpartum Depression","Primary hypersomnia","Primary insomnia","Psychotic disorder","Pyromania","Rumination syndrome","Sadism and masochism","Schizoid","Schizophrenia","Seasonal affective disorder","Self Injury","Separation anxiety disorder","Sleep disorder","Sleep terror disorder","Sleepwalking disorder","Social anxiety disorder","Stuttering","Suicide","Tourette syndrome"];
var medication_trade_alpha = ["Adenocard","Aspirin","Ativan","Atropine","Atrovent","Benadryl","Betaject","Calciject, CaCl","Calcium Gluconate","Codarone","Cogentin","D50W","Decadron","Demerol","Dilantin","Dopamine","Entonox","Epinephrine","Fentanyl","Flumazenil","Glucagon","Gravol","Haldol","Hemabate","Heparin","Hydrocortisone","Indomethacin PR","Ketamine","Labetalol","Lasix","Lidocaine","Magnesium Sulfate","Mannitol","Maxeran","Metolprolol","Morphine","Narcan","Nitroglycerine, GTN, NTG","Norepinephrine","Oxygene","Oxytocin","Pantoloc","Pulmicort","Reteplase","Rocuronium","Sodium Bicarbonate","Succinycholine","Thiamine","Toradol","Tylenol","Tylenol","Valium","Vasopressin","Ventolin","Verapamil","Versed","Vitamin K","Zantac","Zyprexa"];
var medication_generic_alpha = ["Acetamin. w codeine","Acetaminophen","Adenosine","Adrenalin","Amiodarone","Anexate","ASA","Atropine Sulfate","Benztropine","Betamethasone","Betaxin","Budesonide","Calcium Chloride","Calcium Gluconate","Dexamethasone","Dextrose","Diazepam","Dimenhydrinate","Diphenhydramine","Furosemide","Glucagon","Haloperidol","Heparin, Carboprost Tromethamine","Hydrocort","Indocid","Intropin","Ipatroprium Br.","Isoptine, Calan","Ketalar","Keterolac","Levophed","Lorazepam","Meperidine","Metoclopramide, Reglan","Metoprolol","MgSO4","Midazolam","Morphine Sulfate","NaHCO3","Naloxone","Nitroglycerine, GTN, NTG","Nitrous Oxide","Olanzepine","Osmitrol","Oxygene","Pantoprazole","Phenytoin","Phytonadione","Pressyn","Prostaglandin","Ranitidine","Retevase","Salbutemol","Sublimaze","Suxamethonium Cl","Syntocinon","Trandate","Xylocard,Xylocaine","Zemuron"];
var conditions = [];
var medications = [];
var allergies = [];
var listMuscular = [];
var enteringHx = true;
var APGAR_min1 = true;

/********  Creation des tables de la BD  **************/
var shortName = 'ePCR';
var version = '1.0';
var displayName = 'ePCR';
var maxSize = 65536;
db = openDatabase(shortName, version, displayName, maxSize);
createDB();


$(document).ready(function(){
				  
	// initialize iscroll
	KEY_ISCROLL_OBJ = 'iscroll_object';
				  
	function refreshScroll($pane) {
		$pane.find('.s-scrollwrapper, .s-innerscrollwrapper').each(function (i, wrap) {
		  var $wrapper = $(wrap);
		  var scroll = $wrapper.data(KEY_ISCROLL_OBJ);
		  if (scroll !== undefined && scroll !== null) {
			scroll.refresh();
		  }
		});
	}

	function loaded() {
		$("#jqt").children().each(function (i, pane) {
		  $(pane).find('.s-scrollwrapper, .s-innerscrollwrapper').each(function (i, wrap) {
			var $wrapper = $(wrap);

			var data = $wrapper.data(KEY_ISCROLL_OBJ);
			if (data === undefined || data === null) {
			  var scroll;
			  var options = {};

			  scroll = new iScroll(wrap, options);
			  $wrapper.data(KEY_ISCROLL_OBJ, scroll);
			  scroll.refresh();
			}
		  });
		  $(pane).bind('pageAnimationEnd', function(event, info) {
			if (info.direction == 'in') {
			  refreshScroll($(this));
			}
		  });
		});
		$(window).resize(function() {
		  $('#jqt > .current').each(function(i, one) {
			refreshScroll($(one));
		  });
		});
	}

	loaded();


	/*************** bindings  *********************/
		/*********home*********/	
	$('#home').bind('pageAnimationStart', resetCurrentPatient);  				// Reset current patient
//	$('#about').bind('pageAnimationStart', resetCurrentPatient);  				// Reset current patient
		/*********patient*********/
	$('#patient').bind('pageAnimationStart', loadPatient);						//Loads the patient page (New or existing)
		/*********patientInfo*********/
	$('#patient_info').bind('pageAnimationStart', loadPatientInfo);				//Loads infos if patient exists
	$('#patient_info').submit(savePatientInfo);									//saves infos if patient exists
	$('#date_of_birth').change(calculateAge);
		/*********vitals*********/
	$('#vitals_list').bind('pageAnimationStart', loadVitalsList);
	$('#chart').bind('pagein', drawCharts);
	$('#vitals').bind('pageAnimationStart', loadVitals);
	$('#vitals').submit(saveVitals);		//Vitals of current patient
		/*********chief Complaint*********/
	$('#chief_complaint').bind('pageAnimationStart', loadChiefComplaint);
	$('#chief_complaint').submit(saveChiefComplaint);
	/********* patientHx *********/
	$('#patient_hx').bind('pagein', loadPatientHx);
	$('#patient_hx_allergies').bind('pagein', writeAllAllergiesList);
	$('#patient_hx_medication').bind('pagein', writeAllMedicationsList);
	$('#patient_hx_condition').bind('pagein', writeAllConditionsList);
	/********* exam *********/
	$('#exam').bind('pageAnimationStart', showPatientPageWidget);
	/********* neuro *********/
	$('#neuro').bind('pageAnimationStart', loadNeuro);
	$('#neuro').submit(saveNeuro);	
		/********* abc *********/
	$('#abcs').bind('pageAnimationStart', loadAbc);
	$('#abcs').submit(saveAbc);
		/********* trauma  *********/
	$('#trauma').bind('pageAnimationStart', loadTrauma);
		/********* trauma Auto *********/
	$('#auto').bind('pageAnimationStart', loadAuto);
	$('#auto').submit(saveAuto);
		/********* trauma Penetrating *********/
	$('#penetrating').bind('pageAnimationStart', loadPenetrating);
	$('#penetrating').submit(savePenetrating);	
		/********* trauma Blunt *********/
	$('#blunt').bind('pageAnimationStart', loadBlunt);
	$('#blunt').submit(saveBlunt);	
		/********* trauma Fall *********/
	$('#fall').bind('pageAnimationStart', loadFalls);
	$('#fall').submit(saveFalls);	
		/********* trauma Burn *********/
	$('#burn').bind('pageAnimationStart', loadBurn);
	$('#burn').submit(saveBurn);	
		/********* gi_gu *********/
	$('#gi_gu').bind('pageAnimationStart',loadGIGU);
	$('#gi_gu').submit(saveGIGU);
		/********* field delivery *********/
	$('#field_delivery').bind('pageAnimationStart',loadFieldDelivery);
	$('#field_delivery').submit(saveFieldDelivery);
		/********* APGAR *********/
	$('#apgar').submit(saveApgar);
		/********* muscular_skeletal *********/
	$('#muscular_skeletal').bind('pageAnimationStart',loadMuscularSkeletal);
	$('#muscular_skeletal').submit(saveMuscularSkeletal);
		/********* Procedures *********/
	$('#procedures').bind('pageAnimationStart', showPatientPageWidget);
		/********* Airway *********/
	$('#airway_list').bind('pageAnimationStart', loadAirwayList);
	$('#airwayProcedure').bind('pageAnimationStart', loadAirway);
	$('#airwayProcedure').submit(saveAirway);	
		/********* Invasive *********/
	$('#invasive_airway').bind('pageAnimationStart',loadInvasiveAirway);
	$('#invasive_airway').submit(saveInvasiveAirway);	
		/********* Ventilator *********/
	$('#ventilator_list').bind('pageAnimationStart', loadVentilatorList);
	$('#vent').bind('pageAnimationStart',loadVentilator);
	$('#vent').submit(saveVentilator);
		/********* CPAP/BiPAP *********/
	$('#cpap_bipap_list').bind('pageAnimationStart', loadCPAPBiPAPList);
	$('#cpap_bipap').bind('pageAnimationStart',loadCPAP_BiPAP);
	$('#cpap_bipap').submit(saveCPAP_BiPAP);
		/********* Suction *********/
	$('#suction_list').bind('pageAnimationStart', loadSuctionList);		
	$('#suction').bind('pageAnimationStart',loadSuction);
	$('#suction').submit(saveSuction);
		/********* IV/IO *********/
	$('#iv_io_list').bind('pageAnimationStart', loadIV_IOList);			
	$('#iv_io').bind('pageAnimationStart',loadIV_IO);
	$('#iv_io').submit(saveIV_IO);
		/********* Splinting *********/
	$('#splinting_list').bind('pageAnimationStart', loadSplintingList);
	$('#splinting').bind('pageAnimationStart',loadSplinting);
	$('#splinting').submit(saveSplinting);
		/********* Medication *********/
	$('#medication_proc_list').bind('pageAnimationStart', loadMedicationList);
	$('#medication').bind('pageAnimationStart',loadMedication);
	$('#medication').submit(saveMedication);
		/********* C-Spine *********/
	$('#c_spine').bind('pageAnimationStart',loadCSpine);
	$('#c_spine').submit(saveCSpine);
		/********* IN/OUT *********/
	$('#in_out_list').bind('pageAnimationStart', loadInOutList);
	$('#in_out').bind('pageAnimationStart',loadInOut);
	$('#in_out').submit(saveInOut);
		/********* ECG *********/
	$('#ecg_list').bind('pageAnimationStart', loadECGList);
	$('#ecg').bind('pageAnimationStart',loadECG);
	$('#ecg').submit(saveECG);	
		/********* signatures *********/
	$('#signatures').bind('pageAnimationStart', loadSignatures);
	$('#signatures').submit(saveSignatures);
		/********* call info *********/
	$('#call_info').bind('pageAnimationStart', loadCallInfo);
	$('#call_info').submit(saveCallInfo);
		/********* no transport *********/
	$('#no_transport').bind('pageAnimationStart', loadNoTransport);
	$('#no_transport').submit(saveNoTransport);
		/********* Narrative *********/
	$('#narrative_list').bind('pageAnimationStart', loadNarrativeList);
	$('#narrative').bind('pageAnimationStart',loadNarrative);
	$('#narrative').submit(saveNarrative);
		/********* neuro *********/
	$('#exam').bind('pageAnimationStart', showPatientPageWidget);
		/********* Export *********/
	$('#export').bind('pageAnimationStart', showPatientPageWidget);
	$('#export').submit(processExport);	
		/********* Export_page *********/
	$('#export_page').bind('pagein', writeExportMessage);
	$('#export_page').bind('pageAnimationStart', writeExportPage);	
		/********* Patients list *********/
	$('#patients_list').bind('pageAnimationStart', loadPatientsList);
		/********* CODE *********/
	$('#code').bind('pageAnimationStart', loadCode);
	$('#code_list').bind('pageAnimationStart', loadCodeList);
		/*********settings*********/
	$('#settings').submit(saveSettings);						//Save Settings of the application : phone user, metric/imperial, bright colors,...
	$('#settings').bind('pageAnimationStart', loadSettings);
				  
	$('#add_partner').submit(addPartner);
				  
	$('#sync').bind('pagein', loadSync);
	// Hide the sync buttons
	$('#sync').bind('pageout', function(){$('#sync_related').hide();});
	$('#sync').submit(logSyncSuccess);	

	// Building time/date picker for every Time field
	var currYear = (new Date()).getFullYear(); 
	$(".mobiscroll").each(function() {
		if (this.id != "date_of_birth")
			$(this).scroller({ theme: "sense-ui", mode: "scroller", startYear: 1900, endYear: currYear, dateFormat : 'M dd yy', dateOrder : 'MMddyy', preset: 'datetime', ampm: true, timeFormat: 'HH:ii'  });
	});
	
	$("#date_of_birth").scroller({ theme: "sense-ui", mode: "scroller", startYear: 1900, endYear: currYear, dateFormat : 'M dd yy', dateOrder : 'MMddyy', preset: 'date' });
				  
	// Fix for SELECT that lead out of frame
	$('#jqt .s-scrollwrapper select').bind('blur',function(){
		$('#jqt .s-scrollwrapper').scrollTop("0");
	});

	
	// Prevent standard touchmove
	document.addEventListener('touchmove', function(e){ 
							  moved = true; 
							  e.preventDefault();
							  e.stopPropagation();
							},false
						);
		  
	document.addEventListener('touchstart', function(e){
							  moved = false;
	});
	
	// Initialize PIN
	setPIN();
				  
	//Sets the version and updates the database
	setVersion();
				  
	//go To PIN page
	jQT.goTo('#passcode');
				  
});

/***********************************************************************************/
/* 					Create db and Calculate patients 						*/
/***********************************************************************************/
function createDB(){
	createNewPCRtables(db);
	sessionStorage.clear();
	//Calculate number of patients
	calculatePatients();
	
}

/***********************************************************************************/
/* 					Set the version 						*/
/***********************************************************************************/
function setVersion(){
	if ((localStorage.currentVersion == '1.0.0')
		|| (localStorage.currentVersion == '1.0.1')
		|| (localStorage.currentVersion == '1.0.2')
		|| (localStorage.currentVersion == '1.0.3')
		|| (localStorage.currentVersion == '1.0.4')){
		UpdateDatabase();
	}
	if (localStorage.frequent_partners == undefined)
		localStorage.frequent_partners = "";
	localStorage.currentVersion = release;
}

/***********************************************************************************/
/* 					Update specific to the version 						*/
/***********************************************************************************/
function UpdateDatabase(){
	localStorage.frequent_partners = "";
	alert("The database needs to be updated, it could take up to one minute");
	$('body').append('<div id="progress">DB updating, please wait...</div>');
	exportPatients('');
	setTimeout(function(){
			   dropPCRtables();
			   }, 20000
			   );
	// Rebuild Database	
	setTimeout(function(){
			   createNewPCRtables(db);
			   }, 30000
			   );
	setTimeout(function(){
			   InsertPatients();
			   }, 40000
			   );
	setTimeout(function(){
			   $('#progress').remove();
			   alert("Database has been updated");
			   }, 50000
			   );
}

/***********************************************************************************/
/* 					check if we're on iPad 						*/
/***********************************************************************************/
function isIpad(){
	var userAgent = navigator.userAgent;
	var isIpad = (userAgent.indexOf('iPad') != -1) ? true : false;
	return isIpad;
}

/***********************************************************************************/
/* 					check if we're on iPhone					*/
/***********************************************************************************/
function isIphone(){
	var userAgent = navigator.userAgent;
	var isIphone = (userAgent.indexOf('iPhone') != -1) ? true : false;
	return isIphone;
}

/***********************************************************************************/
/* 					check if we're on iPod 						*/
/***********************************************************************************/
function isIpod(){
	var userAgent = navigator.userAgent;
	var isIpod = (userAgent.indexOf('iPod') != -1) ? true : false;
	return isIpod;
}

/***********************************************************************************/
/* 					Replace touch by click 						*/
/***********************************************************************************/
	function rebindClicks(){
		var isTouch = ('ontouchstart' in window);
		
		if (!isTouch) {
			// For each event with an inline onclick
			alert("On n'est ni sur iphone ni ipad ni ipod");
			$('[ontouchend]').each(function() {
				var ontouchend = $(this).prop('ontouchend');
				$(this).removeAttr('ontouchend'); // Remove the onclick attribute
				$(this).bind('click', ontouchend); // Point taps to the onclick
			});
		}
	}

/***********************************************************************************/
/* 					Set the pin 						*/
/***********************************************************************************/
function setPIN(){
	if (localStorage.setPIN != "set"){
		localStorage.currentPIN = "0000";
		localStorage.employee_position = "0";
		showChangePIN();
	}
}

/***********************************************************************************/
/* 					Validate the pin 						*/
/***********************************************************************************/
function validPIN(){
	enteredPIN = $('#pin').val();
	realPIN = localStorage.currentPIN;
	if (enteredPIN == realPIN){
		document.getElementById('lockpad').src="images/img/padlock-icon.gif";
		setTimeout(function() {
			$('#homeMenu').show();
			// Check if iPad
			if (isIpad() == true)
				jQT.goTo("#about", "pop");  // Cheat to load both page in splitscreen mode
			jQT.goTo("#home", "pop");
		}, 1000);
	}
	else {
		$('#pin').val("");
		$('#wrongPINenter').slideDown();
	}
}

/***********************************************************************************/
/* 					Change the pin page						*/
/***********************************************************************************/
function resetPIN(){
	oldPIN = $('#old_pin').val();
	newPIN = $('#new_pin').val();
	confirmPIN = $('#confirm_pin').val();
	realPIN = localStorage.currentPIN;
	if ((oldPIN == realPIN) && (newPIN == confirmPIN)){
		localStorage.currentPIN = newPIN;
		localStorage.setPIN = "set";
		document.getElementById('lockpad').src="images/img/padlock-icon.gif";
		setTimeout(function() {
			$('#homeMenu').show();
			// Check if iPad
			if (isIpad() == true)
			jQT.goTo("#about", "pop");  // Cheat to load both page in splitscreen mode
			jQT.goTo("#home", "pop");
		}, 1000);
	}
	else {
		if (oldPIN != realPIN){
			$('#old_pin').val("");
			$('#wrongPINchange').slideDown();
		}
		if (newPIN != confirmPIN){
			$('#new_pin').val("");
			$('#confirm_pin').val("");
			$('#wrongPINconfirm').slideDown();
		}
	}
}

/***********************************************************************************/
/* 					Show enter pin 						*/
/***********************************************************************************/
function showEnterPIN(){
	$('#divEnterPIN').show();
	$('#enter_link').prop("checked", "checked");
	$('#divChangePIN').hide();
	$('#change_link').prop("checked", "");
}

/***********************************************************************************/
/* 					Show change pin 						*/
/***********************************************************************************/
function showChangePIN(){
	if (localStorage.currentPIN == "0000")
		$('#defaultPIN').show();
	$('#divEnterPIN').hide();
	$('#enter_link').prop("checked", "");
	$('#divChangePIN').show();
	$('#change_link').prop("checked", "checked");
}

/***********************************************************************************/
/* 					Calculate patients 						*/
/***********************************************************************************/
function calculatePatients(){
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM patients',
				[],
				function (transaction, result) {
					var count = 0;
					for (var i=0; i < result.rows.length; i++) {
						count++;
					}
					$('#patientscounter').text(count);
				}
			)
		}
	);
}

/***********************************************************************************/
/* 					Patient on the side						*/
/***********************************************************************************/
function onTheSide(before, after){
	$(before).removeClass("current");
	$(before).prop("section", "");
	$(after).addClass("current");
	$(after).prop("section", "aside");
}

/***********************************************************************************/
/* 					Things to do when home page is displayed 						*/
/***********************************************************************************/
function resetCurrentPatient(){
	
	// Hide the side menu
	hidePatientPageWidget();
	
	sessionStorage.currentPatientId = '0' ;								// Means no current patient	
	loadPatient();
}

function showPatientPageWidget(){
	if (isIpad() == true)
		$('#patientPageSide').show();
}

function hidePatientPageWidget(){
	if (isIpad() == true)
		$('#patientPageSide').hide();
}

/***********************************************************************************/
/* 							Load the patient page 								*/
/***********************************************************************************/
function loadPatient(){
	// Hide the side menu
	hidePatientPageWidget();
	
	ClearAllFields();
	if (sessionStorage.currentPatientId == '0'){
		$('#patient h1').text("New Patient");
		$('#patientPage li').hide();
		$('#codeButton').hide();
		$('#patientInfoLink').show();
	}
	else{
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM patients WHERE id=?',
					[getCurrentPatientId()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);
							$('#patient h1').text(row.last_name + ', ' + row.first_name);
							$('#widgetPatientName').html(row.last_name + ', ' + row.first_name);
							$('#patientPage li').show();
							$('#codeButton').show();
						}
						getAPGARtotals();
						showHideGCS();
					}
				);
			}
		);
	}
}

/***********************************************************************************/
/* 						clear everything for a patient										*/
/***********************************************************************************/
function ClearAllFields() {
	//Clear all fields
	$('ul li input[type="text"]').val('');
	$('ul li input[type="tel"]').val('');
	$('ul li input[type="email"]').val('');
	$('ul li input[type="number"]').val('');
	$('ul li input[type="checkbox"]').prop('checked', true);
	$('ul li select').val('0');
	$('textarea').val('');
	//additional
	$('#patientAge').html('');
	$('#code_list ul.basic').show();
}

/***********************************************************************************/
/* 						get patient infos from db											*/
/***********************************************************************************/
function loadPatientInfo() {
	
	$('#patient_contact_checkbox').prop('checked', false);
	$('#weight_unit').prop('checked', false);
	
	// Initialize Birth Date
	$('#date_of_birth').val(getFormatedDay(getSystemTime()));

	if (sessionStorage.currentPatientId != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM patients WHERE id=?',
					[getCurrentPatientId()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);						
							$('#last_name').val(row.last_name);
							$('#first_name').val(row.first_name);
							$('#get_DOB').prop('checked', getBool(row.get_DOB));
							$('#date_of_birth').val(getFormatedDay(row.date_of_birth));
							$('#gender').prop('checked', getBool(row.gender));	
							$('#weight').val(row.weight);
							$('#weight_unit').prop('checked', getBool(row.weight_unit));
							$('#street').val(row.street);
							$('#city').val(row.city);
							$('#province').val(row.province);
							$('#patient_contact_checkbox').prop('checked', getBool(row.contact));
							$('#home_phone').val(row.phone_home);
							$('#work_phone').val(row.phone_work);
							$('#cell_phone').val(row.phone_cell);
							$('#message_phone').val(row.phone_message);
							$('#insurance').val(row.insurance);
							$('#mrn').val(row.mrn);
							$('#next_of_kin').val(row.next_of_kin);
							$('#next_of_kin_phone').val(row.nok_phone);
							$('#pt_number').val(row.pt_number);
							$('#of_number').val(row.of_number);			
							setMobiscroll(row.time, '#date_of_birth');
						}
						reflectDB('#get_DOB', '#li_date_of_birth');
						reflectDB('#patient_contact_checkbox', '#div_patient_contact');
					}
				);
			}
		);
		// Show the side menu
		showPatientPageWidget();
	}
	reflectDB('#patient_contact_checkbox', '#div_patient_contact');
	setTimeout("calculateAge()",1000);
}

/***********************************************************************************/
/* 							Save the patient info									*/
/***********************************************************************************/
function savePatientInfo() {
	var last_name = toUpperFirst($('#last_name').val());
	var first_name = toUpperFirst($('#first_name').val());
	var get_DOB = $('#get_DOB').prop('checked');
	var date_of_birth = $('#date_of_birth').val();
	var gender = $('#gender').prop('checked');
	var weight = $('#weight').val();
	var weight_unit = $('#weight_unit').prop('checked');
	var street = $('#street').val();
	var city = $('#city').val();
	var province = $('#province').val();
	var contact = $('#patient_contact_checkbox').prop('checked');
	var home_phone = $('#home_phone').val();
	var work_phone = $('#work_phone').val();
	var cell_phone = $('#cell_phone').val();
	var message_phone = $('#message_phone').val();
	var insurance = $('#insurance').val();
	var mrn = $('#mrn').val();
	var next_of_kin = $('#next_of_kin').val();
	var nok_phone = $('#next_of_kin_phone').val();
	var pt_number = $('#pt_number').val();
	var of_number = $('#of_number').val();
	var DOBToUse;

	if (get_DOB == true){
		DOBToUse = Date.parse(date_of_birth);
	}
	else
		DOBToUse = '0';

	/************************************************************************/
	/*			Check if patient already exists: INSERT or UPDATE			*/
	/************************************************************************/
	if (sessionStorage.currentPatientId == '0'){   			/******* INSERT INTO *******/
		_uuid=UUID.generate();
		db.transaction(
					   function(transaction) {
					   transaction.executeSql(
											  'INSERT INTO patients (id, last_name, first_name, get_DOB, date_of_birth, gender, weight, weight_unit, street, city, ' +  //10
											  ' province, contact, phone_home, phone_work, phone_cell, phone_message, insurance, mrn, next_of_kin, nok_phone, pt_number, ' +  //11
											  ' of_number, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',							//2
											  [_uuid, last_name, first_name, get_DOB, DOBToUse, gender, weight, weight_unit, street, city, province, contact, //10
											   home_phone, work_phone, cell_phone, message_phone, insurance, mrn, next_of_kin,  //7
											   nok_phone, pt_number, of_number, getSystemTime()],  //4
											  function(){		
												  setCurrentPatientId(_uuid);
												  createDummyEntries();				
												  var current_patient_name = last_name + ', ' + first_name;
												  $('#widgetPatientName').html(current_patient_name);
												  calculatePatients();			// Refresh the counter
												  showHideGCS()
												  jQT.goBack();
											  },
											  errorHandler
											  );
					   }
					   );
	}
	else {  								/********** UPDATE *******/
		db.transaction(
					   function(transaction) {
					   transaction.executeSql(
											  'UPDATE patients SET last_name = ? , first_name = ? ,get_DOB = ?, date_of_birth = ? , gender = ? , weight = ? , weight_unit = ?, ' +
											  'street = ?, city = ?, province = ?, contact=?, phone_home = ?, phone_work = ?, phone_cell = ?, phone_message = ?, insurance = ?, mrn = ?, next_of_kin = ?, nok_phone = ?, pt_number = ?, of_number = ?, ' +
											  'time = ? WHERE id = ? ;',
											  [last_name, first_name, get_DOB, DOBToUse, gender, weight, weight_unit, street, city, province, contact, home_phone, work_phone, cell_phone, message_phone, insurance, 
											   mrn, next_of_kin, nok_phone, pt_number, of_number, getSystemTime(), getCurrentPatientId()],
											  function(){
											  var current_patient_name = last_name + ', ' + first_name;			// On construit le nom du patient
											  $('#patient h1').text(current_patient_name);
											  $('#widgetPatientName').html(current_patient_name);
											  showHideGCS();
											  jQT.goBack();
											  },
											  null,
											  errorHandler
											  );
					   }
					   );
	}
}

/***********************************************************************************/
/* 								Upper case 1st letter	 								*/
/***********************************************************************************/
function toUpperFirst(str){
	var firstChar = str.substring( 0, 1 ); 
	var tail = str.substring( 1 );
	return firstChar.toUpperCase() + tail;
}

/***********************************************************************************/
/* 								GUSE GCS or APGAR	 								*/
/***********************************************************************************/
function showHideGCS(){
	var dob = "";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM patients WHERE id = ? ;',
				[getCurrentPatientId()],
				function(transaction, result){
					for (var i=0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
						dob = row.date_of_birth;
					}
					var age = getSystemTime() - dob;
					var gcs = true;
					if (age <= 86400000) gcs = false;
					db.transaction(
						function(transaction) {
							transaction.executeSql(
								'UPDATE neuro SET gcs=? WHERE patient=?;', 
								[gcs, getCurrentPatientId()], 
								null,
								errorHandler
							);
						}
					);
				},
				errorHandler
			);
		}
	);
}


/***********************************************************************************/
/* 							Give an id to the patient 								*/
/***********************************************************************************/
function calculateAvailablePatientNumber(){
	var currentId;
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT MAX(id) as max_id FROM patients',
				null,
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
						currentId = row.max_id +1;
					}
					setAvailablePatientId(currentId);				
				}
			);
		}
	);
}

/***********************************************************************************/
/* 							Gets the id off the patient 								*/
/***********************************************************************************/
function getCurrentPatientId(){
	return sessionStorage.currentPatientId;
}
/***********************************************************************************/
/* 							Sets the id off the patient 								*/
/***********************************************************************************/
function setCurrentPatientId(uuid){
	sessionStorage.currentPatientId = uuid;
}

/***********************************************************************************/
/* 							Load Vitals List 								*/
/***********************************************************************************/
function loadVitalsList() {
	loadRecordsList('#vitals_sorted', 'vitals', '#vitalsTemplate', '.vitals_time', '#vitals');
}

/***********************************************************************************/
/* 						get a formated date			ie March 14 2011 15:34:28     	*/
/***********************************************************************************/
function getFormatedDate(myTime) {
	dateObj = new Date;
	dateObj.setTime(myTime);
	var months=new Array(12);
	months[0]="January";
	months[1]="February";
	months[2]="March";
	months[3]="April";
	months[4]="May";
	months[5]="June";
	months[6]="July";
	months[7]="August";
	months[8]="September";
	months[9]="October";
	months[10]="November";
	months[11]="December";
	var month = dateObj.getMonth();
	var day = dateObj.getDate();
	var year = dateObj.getFullYear();
	var hours = dateObj.getHours();
	var min = dateObj.getMinutes();
	var sec = dateObj.getSeconds();
	if (hours < "10") hours = "0" + hours;
	if (min < "10") min = "0" + min;
	if (sec < "10") sec = "0" + sec;
	var formated = months[month] + " " + day + " " + year + " " + hours + ":" + min + ":" + sec;
	if ((myTime != null) && (myTime != '0') && (myTime != ''))
		return formated;
	else
		return '';
}

/***********************************************************************************/
/* 						get a formated day		ie  March 14 2011					*/
/***********************************************************************************/
function getFormatedDay(myTime) {
	dateObj = new Date;
	dateObj.setTime(myTime);
	var months=new Array(12);
	months[0]="January";
	months[1]="February";
	months[2]="March";
	months[3]="April";
	months[4]="May";
	months[5]="June";
	months[6]="July";
	months[7]="August";
	months[8]="September";
	months[9]="October";
	months[10]="November";
	months[11]="December";
	var month = dateObj.getMonth();
	var day = dateObj.getDate();
	var year = dateObj.getFullYear();
	var formated = months[month] + " " + day + " " + year;
	return formated;
}

/***********************************************************************************/
/* 						get a formated Time		ie 15:34							*/
/***********************************************************************************/
function getFormatedTime(myTime) {
	dateObj = new Date;
	dateObj.setTime(myTime);
	var hours = dateObj.getHours();
	var min = dateObj.getMinutes();
	var sec = dateObj.getSeconds();
	if (hours < "10") hours = "0" + hours;
	if (min < "10") min = "0" + min;
	var formated = hours + ":" + min;
	return formated;
}

/***********************************************************************************/
/* 						get a Precise Formated Time		ie 15:34:28							*/
/***********************************************************************************/
function getFormatedPreciseTime(myTime) {
	dateObj = new Date;
	dateObj.setTime(myTime);
	var hours = dateObj.getHours();
	var min = dateObj.getMinutes();
	var sec = dateObj.getSeconds();
	if (hours < "10") hours = "0" + hours;
	if (min < "10") min = "0" + min;
	if (sec < "10") sec = "0" + sec;
	var formated = hours + ":" + min + ":" +sec;
	return formated;
}

/***********************************************************************************/
/* 						get a list formated Time		ie 15:34:28 March 14 2011	*/
/***********************************************************************************/
function getFullFormatedTime(myTime) {
	dateObj = new Date;
	dateObj.setTime(myTime);
	var months=new Array(12);
	months[0]="January";
	months[1]="February";
	months[2]="March";
	months[3]="April";
	months[4]="May";
	months[5]="June";
	months[6]="July";
	months[7]="August";
	months[8]="September";
	months[9]="October";
	months[10]="November";
	months[11]="December";
	var month = dateObj.getMonth();
	var day = dateObj.getDate();
	var year = dateObj.getFullYear();
	var hours = dateObj.getHours();
	var min = dateObj.getMinutes();
	var sec = dateObj.getSeconds();
	if (hours < "10") hours = "0" + hours;
	if (min < "10") min = "0" + min;
	if (sec < "10") sec = "0" + sec;
	var formated = hours + ":" + min + ":" + sec + "  " + months[month] + " " + day + " " + year;
	return formated;
}

/***********************************************************************************/
/* 						get vitals into fields matching patient id				*/
/***********************************************************************************/
function loadVitals() {
	ClearAllFields();
	// initialize to PERRL
	$('#perrl').prop('checked', true);
	$('#temp_unit').prop('checked', false);
	$('#vitals_time').val(getFormatedDate(getSystemTime()));
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM vitals WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#hr').val(row.hr);
							$('#sys').val(row.sys);
							$('#dia').val(row.dia);
							$('#fio2').val(row.fio2);
							$('#spo2').val(row.spo2);
							$('#resp').val(row.resp);
							$('#level_of_c').val(row.level_of_c);
							$('#left_eye').val(row.left_eye);
							$('#right_eye').val(row.right_eye);
							$('#perrl').prop('checked', getBool(row.perrl));
							$('#eye_response').prop('checked', getBool(row.responsive));
							$('#bgl').val(row.bgl);	
							$('#bgl_unit').prop('checked', getBool(row.bgl_unit));							
							$('#temp').val(row.temp);		
							$('#temp_unit').prop('checked', getBool(row.temp_unit));
							$('#etco2').val(row.etco2);			
							$('#pain').val(row.pain);
							$('#vitals_time').val(getFormatedDate(row.time));
							setMobiscroll(row.time, '#vitals_time');
						}
						reflect_perrl();
					}
				);
			}
		);
	}
	reflect_perrl();
}

/***********************************************************************************/
/* 						save vitals into fields matching patient id				*/
/***********************************************************************************/
function saveVitals() {
	var hr = $('#hr').val();
	var sys = $('#sys').val();
	var dia = $('#dia').val();
	var fio2 = $('#fio2').val();
	var spo2 = $('#spo2').val();
	var resp = $('#resp').val();
	var level_of_c = $('#level_of_c option:selected').val();
	var left_eye = $('#left_eye').val();
	var right_eye = $('#right_eye').val();
	var perrl = $('#perrl').prop('checked');
	var response = $('#eye_response').prop('checked');
	var bgl = $('#bgl').val();
	var bgl_unit = $('#bgl_unit').prop('checked');
	var temp = $('#temp').val();
	var temp_unit = $('#temp_unit').prop('checked');
	var etco2 = $('#etco2').val();
	var pain = $('#pain').val();
	var time = $('#vitals_time').val();
	var timeToUse = Date.parse(time);
	
	if (perrl == true)
		right_eye = left_eye;
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO vitals (patient, hr, sys, dia, fio2, spo2, resp, level_of_c, left_eye, right_eye, perrl, responsive, bgl, bgl_unit, temp, temp_unit, etco2, pain, time) ' +
					' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), hr, sys, dia, fio2, spo2, resp, level_of_c, left_eye, right_eye, perrl, response, bgl, bgl_unit, temp, temp_unit, etco2, pain, timeToUse], 
					function(){	
						jQT.goBack();														// on va a la page d'avant
					},
					errorHandler
				);
			}
		);
	}
	else {  								/********** UPDATE *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE vitals SET hr = ?, sys = ?, dia = ?, fio2=?, spo2 = ?, resp = ?, level_of_c = ?, left_eye = ?, right_eye = ?, ' +
					'perrl = ?, responsive = ?, bgl = ?, bgl_unit = ?, temp = ?, temp_unit = ?, etco2 = ?, pain = ?, time = ? WHERE id = ? ;',
					[hr, sys, dia, fio2, spo2, resp, level_of_c, left_eye, right_eye, perrl, response, bgl, bgl_unit, temp, temp_unit, etco2, pain, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
	return false;
	
}

/***********************************************************************************/
/* 						drawCharts									*/
/***********************************************************************************/
function drawCharts(){
	var labels = [],
        hrValues = [],
        sysValues = [],
        diaValues = [],
        fio2Values = [],
        spo2Values = [],
        respValues = [],
        locValues = [],
        leftEyeValues = [],
        rightEyeValues = [],
        bglValues = [],
        bglUnits = [],
        etco2Values = [],
        tempValues = [],
        tempUnits = [],
        painValues = [];

	// TODO Push the datas in arrays
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM vitals WHERE patient=? ORDER BY CAST(time AS INT);',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						labels.push(getFormatedTime(row.time));	
						hrValues.push(row.hr);
						sysValues.push(row.sys);
						diaValues.push(row.dia);
						fio2Values.push(row.fio2);
						spo2Values.push(row.spo2);
						respValues.push(row.resp);
						locValues.push(row.level_of_c);
						leftEyeValues.push(row.left_eye);
						rightEyeValues.push(row.right_eye);
						bglValues.push(row.bgl);
						bglUnits.push(row.bgl_unit);
						etco2Values.push(row.etco2);
						tempValues.push(row.temp);
						tempUnits.push(row.temp_unit);
						painValues.push(row.pain);
					}
					$('#holder').empty();
					$('#holder2').empty();
					$('#holder').css("background","black");
					$('#holder2').css("background","black");
					if (isIpad())
						$('#holder').css("height","370px");
					if ((isIphone()) || (isIpod()))
						$('#holder').css("height","210px");
					$('#holder2').css("height","600px");		   
					drawVitals("holder",labels, [hrValues, sysValues, diaValues, fio2Values, spo2Values, respValues, locValues, leftEyeValues,
					rightEyeValues, bglValues, etco2Values, tempValues, painValues], bglUnits, tempUnits);
					 drawVitals("holder2",labels, [hrValues, sysValues, diaValues, fio2Values, spo2Values, respValues, locValues, leftEyeValues,
					rightEyeValues, bglValues, etco2Values, tempValues, painValues], bglUnits, tempUnits);
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						get Chief Complaint into fields matching patient id				*/
/***********************************************************************************/
function loadChiefComplaint() {
	// Show the side menu
	showPatientPageWidget();
	
	$('#chief_complaint_line1 li').data('status', '');
	$('#chief_complaint_line2 li').data('status', '');
	$('#chief_complaint_line3 li').data('status', '');
	
	// Empty the select
	$('#chief_complaint_1').empty();
	$('#chief_complaint_1').append('<option value="0">Other</option>');
	reflect_select('#chief_complaint_1', 0, '#li_primary_complaint_other');
	
	for (var i=0; i < complaints_list.length; i++) {
		var row = complaints_list[i];
		$('#chief_complaint_1').append("<option value=" + (i+1) +">" + row + "</option>");
	}
	$('#chief_complaint_1').val(0);
	// The buttons are initialized
	colorChiefComplaintButtons();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM chief_complaint WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);	
						$('#chief_complaint_1').val(row.primary_complaint);
						$('#chief_complaint_1_other').val(row.primary_other);
						$('#chief_complaint_2').val(row.secondary_complaint);
						$('#cc_diff_breathing').data('status', row.diff_breathing);
						$('#cc_chest_pain').data('status', row.chest_pain);
						$('#cc_nausea').data('status', row.nausea);
						$('#cc_vomiting').data('status', row.vomiting);
						$('#cc_diarrhea').data('status', row.diarrhea);
						$('#cc_dizziness').data('status', row.dizziness);
						$('#cc_headache').data('status', row.headache);
						$('#cc_loc').data('status', row.loc);
						$('#cc_numb_tingling').data('status', row.numb_tingling);
						$('#cc_gal_weakness').data('status', row.gal_weakness);
						$('#cc_lethargy').data('status', row.lethargy);
						$('#cc_neck_pain').data('status', row.neck_pain);
						//$('#chief_complaint_time').val(row.time);	
						colorChiefComplaintButtons();
					}
					reflect_select('#chief_complaint_1', 0, '#li_primary_complaint_other');
				}
			)
		}
	);
}

/***********************************************************************************/
/* 						save Chief Complaint into fields matching patient id				*/
/***********************************************************************************/
function saveChiefComplaint() {
	var complaint1 = $('#chief_complaint_1 option:selected').val();
	var complaint1_other = $('#chief_complaint_1_other').val();
	var complaint2 = $('#chief_complaint_2').val();
	var diff_breathing = $('#cc_diff_breathing').data('status');
	var chest_pain = $('#cc_chest_pain').data('status');
	var nausea = $('#cc_nausea').data('status');
	var vomiting = $('#cc_vomiting').data('status');
	var diarrhea = $('#cc_diarrhea').data('status');
	var dizziness = $('#cc_dizziness').data('status');
	var headache = $('#cc_headache').data('status');
	var loc = $('#cc_loc').data('status');
	var numb_tingling = $('#cc_numb_tingling').data('status');
	var weakness = $('#cc_gal_weakness').data('status');
	var lethargy = $('#cc_lethargy').data('status');
	var neck_pain = $('#cc_neck_pain').data('status');
//	var time = $('#chief_complaint_time option:selected').val();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE chief_complaint SET assessed=?, primary_complaint=?, primary_other=?, secondary_complaint=?, diff_breathing=?, chest_pain=?, nausea=?, ' +
				' vomiting=?, diarrhea=?, dizziness=?, ' +
				' headache=?, loc=?, numb_tingling=?, gal_weakness=?, lethargy=?, neck_pain=?, time=? WHERE patient = ? ;',
				['true', complaint1, complaint1_other, complaint2, diff_breathing, chest_pain, nausea, vomiting, diarrhea, dizziness, headache, loc, numb_tingling, weakness, lethargy, neck_pain, getSystemTime(), getCurrentPatientId()],      
				function(){	
					jQT.goBack();														// on va a la page d'avant
				},
				errorHandler
			);
		}
	);
}				 
		 
/***********************************************************************************/
/* 						loadPatientHx												*/
/***********************************************************************************/
function loadPatientHx() {
	
	// Show the side menu
	showPatientPageWidget();
	
	// initialize arrays
	conditions = [];
	medications = [];
	allergies = [];
	
	//Load the arrays from the db
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'SELECT * FROM patient_hx WHERE patient = ?;',
				[getCurrentPatientId()],
                function (transaction, result) {
                    for (var i=0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
						if (row.conditions != "")
							conditions = (row.conditions).split(",");
						if (row.medications != "")
							medications = (row.medications).split(",");
						if (row.allergies != "")
							allergies = (row.allergies).split(",");
						$('#pt_hx_allergies_other').val(row.custom_allergies);
						$('#pt_hx_conditions_other').val(row.custom_conditions);
						$('#pt_hx_medications_other').val(row.custom_medications);
                    } 
					
					//fill the list
					fillAllergiesList();
					fillConditionsList();
					fillMedicationsList();
                }, 
                errorHandler
            );
        }
    );
}

/***********************************************************************************/
/* 						Save Patient Hx												*/
/***********************************************************************************/
function savePatientHx(){
	var strAllergies = allergies.join(',');
	var strMedications = medications.join(',');
	var strConditions = conditions.join(',');
	var customA = $('#pt_hx_allergies_other').val();
	var customC = $('#pt_hx_conditions_other').val();
	var customM = $('#pt_hx_medications_other').val();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE patient_hx SET assessed=?, allergies=?, custom_allergies= ?, conditions=?, custom_conditions= ?, ' +
				' medications=?, custom_medications= ?, time=? WHERE patient = ? ;',
				['true', strAllergies, customA, strConditions, customC, strMedications, customM, getSystemTime(), getCurrentPatientId()],      
				null,
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						writeAllMedicationsList										*/
/***********************************************************************************/
function writeAllMedicationsList() {
	$('#medication_list li:gt(1)').remove();
	for (var i=0; i < medication_generic_alpha.length; i++) {
		var row = medication_generic_alpha[i];
		var newEntryRow = $('#medication_template').clone();
		newEntryRow.removeAttr('id');
		newEntryRow.removeAttr('style');	
		newEntryRow.appendTo('#medication_list');
		newEntryRow.find('.last_name').text(row);
		newEntryRow.data("status", "disabled");
		newEntryRow.find('.unlock_line').bind('touchstart', function(e){
			var clickedEntry = $(this).parent();
			var sign = clickedEntry.find('.unlock_line');
			if (clickedEntry.data("status") == "enabled"){
				clickedEntry.data("status", "disabled");
				sign.prop("src","images/img/disabled.png");
			}
			else{
				clickedEntry.data("status", "enabled");
				sign.prop("src","images/img/enabled.png");
			}
			e.stopPropagation();
			e.preventDefault();
		});
	}
	switchMedication(false);
}

/***********************************************************************************/
/* 						Load the right medication names								*/
/***********************************************************************************/
function switchMedication(medListGeneric){
	medication_list = [];
	if (medListGeneric == false){
		medication_list = medication_generic_alpha;
	}
	else{
		medication_list = medication_trade_alpha;
	}
	for (var i=0; i < medication_list.length; i++) {
		var row = medication_list[i];
		$('#medication_list > li').eq(i+2).find('.last_name').text(row);
	}
}

/***********************************************************************************/
/* 						Writes the patient's Medications list						*/
/***********************************************************************************/
function patientMedicationsList(){
	$('#medication_list li').each(function(index) {
		if ($(this).data("status") == "enabled"){
			if ($('#generic_trade').prop('checked') == true)
				medications.push(index - 2);
			else
				medications.push(convertToGenericNb(index - 2));
		}
	});
	
	fillMedicationsList();
}

/***********************************************************************************/
/* 						Retrieve Trade Drug number corresponding to generic							*/
/***********************************************************************************/
function convertToTradeNb(pos){
	var matchingTrade = ["50","51","1","18","10","20","2","4","11","7","48","43","8","9","13","12","52","22","6","30","21","23","25","26","27","16","5","55","28","49","39","3","14","34","35","32","56","36","46","37","38","17","59","33","40","42","15","57","53","24","58","44","54","19","47","41","29","31","45"];
	return parseInt(matchingTrade[pos])-1;
}

/***********************************************************************************/
/* 						Retrieve Generic Drug number corresponding to Trade							*/
/***********************************************************************************/
function convertToGenericNb(pos){
var matchingGeneric = ["3","7","32","8","27","19","10","13","14","5","9","16","15","33","47","26","42","4","54","6","21","18","22","50","23","24","25","29","57","20","58","36","44","34","35","38","40","41","31","45","56","46","12","52","59","39","55","11","30","1","2","17","49","53","28","37","48","51","43"];
return parseInt(matchingGeneric[pos])-1;
}

/***********************************************************************************/
/* 						write the patients medications from global array			*/
/***********************************************************************************/
function fillMedicationsList() {

	//Start by clearing the list
	$('#patient_hx_medication_list li:gt(1)').remove();

	for (var i=0; i < medications.length; i++) {
		var row = medications[i];
		var newEntryRow = $('#homeMedications_template').clone();
		newEntryRow.removeAttr('id');
		newEntryRow.removeAttr('style');	
		newEntryRow.data("entryId",i);
		newEntryRow.appendTo('#patient_hx_medication_list');
		newEntryRow.find('.hx_entry').text(medication_trade_alpha[convertToTradeNb(row)] + " (" + medication_generic_alpha[row] + ")");
		newEntryRow.find('.delete').bind('touchstart', function(e){
			var clickedMedication = $(this).parent();
			var clickedMedicationId = clickedMedication.data('entryId');
			medications.splice(clickedMedicationId, 1);
			clickedMedication.slideUp();
			e.stopPropagation();
		});
		newEntryRow.find('.unlock_line').bind('touchstart', function(e){
			var clickedEntry = $(this).parent();
			var clickedEntryId = clickedEntry.data('entryId');
			delete_show_hide(this);
			e.stopPropagation();
		});
	}
}

/***********************************************************************************/
/* 						writeAllAllergiesList										*/
/***********************************************************************************/
function writeAllAllergiesList() {
	$('#allergies_list li:gt(1)').remove();
	for (var i=0; i < listOfAllergies.length; i++) {
		var row = listOfAllergies[i];
		var newEntryRow = $('#allergy_template').clone();
		newEntryRow.removeAttr('id');
		newEntryRow.removeAttr('style');	
		newEntryRow.appendTo('#allergies_list');
		newEntryRow.find('.last_name').text(row);
		newEntryRow.data("status", "disabled");
		newEntryRow.find('.unlock_line').bind('touchstart', function(e){
			var clickedEntry = $(this).parent();
			var sign = clickedEntry.find('.unlock_line');
			if (clickedEntry.data("status") == "enabled"){
				clickedEntry.data("status", "disabled");
				sign.prop("src","images/img/disabled.png");
			}
			else{
				clickedEntry.data("status", "enabled");
				sign.prop("src","images/img/enabled.png");
			}
		});
	}
}

/***********************************************************************************/
/* 						Writes the patient's Allergies list							*/
/***********************************************************************************/
function patientAllergiesList(){
	$('#allergies_list li').each(function(index) {
		if ($(this).data("status") == "enabled"){
			allergies.push(index - 2);
		}
	});
	
	fillAllergiesList();
}

/***********************************************************************************/
/* 						write the patients allergies from global array				*/
/***********************************************************************************/
function fillAllergiesList() {

	//Start by clearing the list
	$('#patient_hx_allergies_list li:gt(1)').remove();

	for (var i=0; i < allergies.length; i++) {
		var row = allergies[i];
		var newEntryRow = $('#allergies_template').clone();
		newEntryRow.removeAttr('id');
		newEntryRow.removeAttr('style');	
		newEntryRow.data("entryId",i);
		newEntryRow.appendTo('#patient_hx_allergies_list');
		newEntryRow.find('.hx_entry').text(listOfAllergies[row]);
		newEntryRow.find('.delete').bind('touchstart', function(e){
			var clickedAllergy = $(this).parent();
			var clickedAllergyId = clickedAllergy.data('entryId');
			allergies.splice(clickedAllergy, 1);
			clickedAllergy.slideUp();
			e.stopPropagation();
		});
		newEntryRow.find('.unlock_line').bind('touchstart', function(e){
			var clickedEntry = $(this).parent();
			var clickedEntryId = clickedEntry.data('entryId');
			delete_show_hide(this);
			e.stopPropagation();
		});	
	}
}

/***********************************************************************************/
/* 						loadPatientHx Conditions choser	from big array				*/
/***********************************************************************************/
function writeAllConditionsList() {
	$('condition_part').val('0');
	writeConditionList("0", "CVS", "C");
}

/***********************************************************************************/
/* 						Populates the HX condition choser							*/
/***********************************************************************************/
function writeConditionList(val, groupName, prefix){
	var pArray;
	if (val == "0")
		pArray = cvs;
	if (val == "1")
		pArray = resp;
	if (val == "2")
		pArray = gugi;
	if (val == "3")
		pArray = neuro;
	if (val == "4")	
		pArray = endocrine;
	if (val == "5")
		pArray = psych;

	$('#condition_list li:gt(1)').remove();
	for (var i=0; i < pArray.length; i++) {
		var row = pArray[i];
		var newEntryRow = $('#condition_template').clone();
		newEntryRow.removeAttr('id');
		newEntryRow.removeAttr('style');	
		newEntryRow.appendTo('#condition_list');
		newEntryRow.data("status", "disabled");
		newEntryRow.data("group", groupName);
		newEntryRow.data("prefix", prefix);
		newEntryRow.find('.last_name').text(row);
		newEntryRow.find('.unlock_line').bind('touchstart', function(e){
			var clickedEntry = $(this).parent();
			var sign = clickedEntry.find('.unlock_line');
			if (clickedEntry.data("status") == "enabled"){
				clickedEntry.data("status", "disabled");
				sign.prop("src","images/img/disabled.png");
			}
			else{
				clickedEntry.data("status", "enabled");
				sign.prop("src","images/img/enabled.png");
			}
		});
	}
}

/***********************************************************************************/
/* 						fill chosen conditions in Main from big Array				*/
/***********************************************************************************/
function fillConditionsList(){
	
	//Start by clearing the list
	$('#patient_hx_conditions_list li:gt(1)').remove();
	
	//load the lists
	for (var i=0; i < conditions.length; i++) {
		var row = conditions[i];
		var prefix = row.substr(0, 1);
		var suffix = row.substr(1, row.length);
		var pArray;
		if (prefix == "C")
			pArray = cvs;
		if (prefix == "R")
			pArray = resp;
		if (prefix == "G")
			pArray = gugi;
		if (prefix == "N")
			pArray = neuro;
		if (prefix == "E")	
			pArray = endocrine;
		if (prefix == "P")
			pArray = psych;
		var newEntryRow = $('#medicalCondition_template').clone();
		newEntryRow.removeAttr('id');
		newEntryRow.removeAttr('style');	
		newEntryRow.data("entryId",i);
		newEntryRow.appendTo('#patient_hx_conditions_list');
		newEntryRow.find('.hx_entry').text(pArray[suffix]);
		newEntryRow.find('.delete').bind('touchstart', function(e){
			var clickedCondition = $(this).parent();
			var clickedConditionId = clickedCondition.data('entryId');
			conditions.splice(clickedConditionId, 1);
			clickedCondition.slideUp();
			e.stopPropagation();
		});
		newEntryRow.find('.unlock_line').bind('touchstart', function(e){
			var clickedEntry = $(this).parent();
			var clickedEntryId = clickedEntry.data('entryId');
			delete_show_hide(this);
			e.stopPropagation();
		});
	}
}

/***********************************************************************************/
/* 						Change value in Hx condition depending on Select			*/
/***********************************************************************************/
function changeConditionList(elem){ 
	//save first
	patientConditionsList();
	var group = $('#' + elem.id + ' option:selected').text();
	var val = $('#' + elem.id + ' option:selected').val();
	var prefix = group.substr(0, 1);
	writeConditionList(val, group, prefix);
}

/***********************************************************************************/
/* 						Writes the patient's conditions list						*/
/***********************************************************************************/
function patientConditionsList(){
	$('#condition_list li').each(function(index) {
		if ($(this).data("status") == "enabled"){
			var prefix = $(this).data("prefix");
			conditions.push(prefix + (index - 2));
		}
	});
	
	// fill the list
	fillConditionsList();
}
 
/***********************************************************************************/
/* 						Enable the right conditions from an Array					*/
/***********************************************************************************/
function EnableConditions(){
	for (var i=0; i < conditions.length; i++) {
		var row = conditions[i];
		$('#condition_list:nth-child('+ row +')').data("status", "enabled");
		$('#condition_list:nth-child('+ row +')').find('.enabler').prop("src","images/img/enabled.png");
	}
}
 
/***********************************************************************************/
/* 						get neuro into fields matching patient id					*/
/***********************************************************************************/
function loadNeuro() {
	
	// init buttons status
	$('#neuro_psm li').data('status', 'negative');
	$('#facial_droop').prop('checked', false);
	$('#arm_drift').prop('checked', false);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM neuro WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#avpu').val(row.avpu);
						$('#gcs').prop('checked', getBool(row.gcs));
						$('#eyes').val(row.eyes);
						$('#verbal').val(row.verbal);
						$('#motor').val(row.motor);
						calculateTotalNeuro();
						$('#psm_lux').data('status', row.luxr);
						$('#psm_rux').data('status', row.ruxr);
						$('#psm_llx').data('status', row.llxr);
						$('#psm_rlx').data('status', row.rlxr);
						$('#suspect_stroke').prop('checked', getBool(row.suspect_stroke));
						$('#facial_droop').prop('checked', getBool(row.facial_droop));
						$('#facial_droop_side').prop('checked', getBool(row.facial_droop_side));
						$('#arm_drift').prop('checked', getBool(row.arm_drift));
						$('#arm_drift_side').prop('checked', getBool(row.arm_drift_side));
						$('#speech').val(row.speech);					
						//$('#neuro_time').val(row.time);							
					}
					reflectGCS('#gcs', '#li_gcs_related', '#li_apgar_related');
					reflectDB('#facial_droop', '#li_facial_droop_side');
					reflectDB('#arm_drift', '#li_arm_drift_side');
					// set the css and data property for each button
					$('#neuro_psm li').each(function(index) {
						if (($(this).data('status') == 'negative')){
							$(this).prop('class', '');
						}
						else {
							$(this).prop('class', 'twoTap');
						}
					});
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save neuro into fields matching patient id				*/
/***********************************************************************************/
function saveNeuro() {
	var avpu = $('#avpu option:selected').val();
	var gcs = $('#gcs').prop('checked');
	var eyes = $('#eyes option:selected').val();
	var verbal = $('#verbal option:selected').val();
	var motor = $('#motor option:selected').val();
	var luxr = $('#psm_lux').data('status');
	var ruxr = $('#psm_rux').data('status');
	var llxr = $('#psm_llx').data('status');
	var rlxr = $('#psm_rlx').data('status');
	var s_s = $('#suspect_stroke').prop('checked');
	var f_d = $('#facial_droop').prop('checked');
	var f_d_s = $('#facial_droop_side').prop('checked');
	var a_d = $('#arm_drift').prop('checked');
	var a_d_s = $('#arm_drift_side').prop('checked');
	var speech = $('#speech option:selected').val();
	//var time = $('#neuro_time option:selected').val();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE neuro SET assessed=?, avpu=?, gcs=?, eyes=?, verbal=?, motor=?, luxr=?, ruxr=?, llxr=?, rlxr=?, suspect_stroke=?, ' +
				' facial_droop=?, facial_droop_side=?, arm_drift=?, arm_drift_side=?, speech=?, time=? WHERE patient=?;', 
				['true', avpu, gcs, eyes, verbal, motor, luxr, ruxr, llxr, rlxr, s_s, f_d, f_d_s, a_d, a_d_s, speech, getSystemTime(), getCurrentPatientId()], 
				function(){	
					jQT.goBack();														// on va a la page d'avant
				},
				errorHandler
			);
		}
	);
}
	
/***********************************************************************************/
/* 						get abc into fields matching patient id					*/
/***********************************************************************************/
function loadAbc() {
	abcToggle('a');
	$('#accessory_muscle').prop('checked', false);
	$('#jvd').prop('checked', false);
	$('#tracheal_deviation').prop('checked', false); 
	$('#interventions').prop('checked', false); 
	$('#flailed_chest').prop('checked', false);
	$('#peripheral_edema').prop('checked', false);
	$('#ctax4').prop('checked', false);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM abc WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#open_patent').prop('checked', getBool(row.open_patent));
						$('#tracheal_deviation').prop('checked', getBool(row.tracheal_deviation));
						$('#tracheal_deviation_side').prop('checked', getBool(row.tracheal_deviation_side));
						$('#interventions').prop('checked', getBool(row.interventions));
						$('#breathing_type').val(row.breathing_type);
						$('#laboured').prop('checked', getBool(row.laboured));
						$('#effective').prop('checked', getBool(row.effective));
						$('#accessory_muscle').prop('checked', getBool(row.accessory_muscle));
						$('#nasal_flare').prop('checked', getBool(row.nasal_flare));
						$('#cough').prop('checked', getBool(row.cough));
						$('#productive').prop('checked', getBool(row.productive));
						$('#subcutaneous_emphysema').prop('checked', getBool(row.subcut_emph));
						$('#flailed_chest').prop('checked', getBool(row.flailed_chest));
						$('#flailed_chest_side').prop('checked', getBool(row.flailed_chest_side));
						$('#suspect_pneumothorax').prop('checked', getBool(row.suspect_pneu));
						$('#suspect_hemothorax').prop('checked', getBool(row.suspect_hemo));		
						$('#ctax4').prop('checked', getBool(row.ctax4));
						$('#UL_Lung_Sound').val(row.ul_sound);
						$('#UR_Lung_Sound').val(row.ur_sound);
						$('#LL_Lung_Sound').val(row.ll_sound);
						$('#LR_Lung_Sound').val(row.lr_sound);
						$('#pulse_location').val(row.pulse_location);
						$('#pulse_regularity').prop('checked', getBool(row.pulse_regularity));
						$('#pulse_quality').val(row.pulse_quality);
						$('#jvd').prop('checked', getBool(row.jvd));
						$('#cap_refill').prop('checked', getBool(row.cap_refill));
						$('#skin').val(row.skin);
						$('#abctemp').val(row.abctemp);
						$('#dry').prop('checked', getBool(row.dry));
						$('#heart_tones').val(row.heart_tones);
						$('#heart_tones_quality').val(row.heart_tones_quality);						
						$('#peripheral_edema').prop('checked', getBool(row.peripheral_edema));
						$('#peripheral_edema_location').val(row.peripheral_edema_location);
						$('#edema_severity').val(row.edema_severity);					
						//$('#abc_time').val(row.time);				
					}
					reflect_lungs();
					reflectDB('#tracheal_deviation', '#li_tracheal_deviation_side');
					reflectDB('#interventions', '#ul_interventions');
					reflectDB('#cough', '#li_productive');
					reflectDB('#flailed_chest', '#li_flailed_chest_side');
					reflectDB('#peripheral_edema', '#div_edema_details');
					/* populateEdemaDetails(); */
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save abc											*/
/***********************************************************************************/
function saveAbc(link){ 
	var o_p = $('#open_patent').prop('checked');
	var t_d = $('#tracheal_deviation').prop('checked');
	var t_d_s = $('#tracheal_deviation_side').prop('checked');
	var interv = $('#interventions').prop('checked');
	var b_t = $('#breathing_type option:selected').val();
	var laboured = $('#laboured').prop('checked');
	var effective = $('#effective').prop('checked');
	var a_m = $('#accessory_muscle').prop('checked');
	var n_f = $('#nasal_flare').prop('checked');
	var cough = $('#cough').prop('checked');
	var productive = $('#productive').prop('checked');
	var s_e = $('#subcutaneous_emphysema').prop('checked');
	var f_c = $('#flailed_chest').prop('checked');
	var f_c_s = $('#flailed_chest_side').prop('checked');
	var s_p = $('#suspect_pneumothorax').prop('checked');
	var s_h = $('#suspect_hemothorax').prop('checked');
	var ctax4 = $('#ctax4').prop('checked');
	var ulls = $('#UL_Lung_Sound option:selected').val();
	var urls = $('#UR_Lung_Sound option:selected').val();
	var llls = $('#LL_Lung_Sound option:selected').val();
	var lrls = $('#LR_Lung_Sound option:selected').val();
	var p_l = $('#pulse_location option:selected').val();
	var p_r = $('#pulse_regularity').prop('checked');
	var p_q = $('#pulse_quality option:selected').val();
	var jvd = $('#jvd').prop('checked');
	var c_r = $('#cap_refill').prop('checked');
	var skin = $('#skin option:selected').val();
	var temp = $('#abctemp option:selected').val();
	var dry = $('#dry').prop('checked');
	var h_t = $('#heart_tones option:selected').val();
	var h_t_q = $('#heart_tones_quality option:selected').val();
	var p_e = $('#peripheral_edema').prop('checked');
	var edema_loc = $('#peripheral_edema_location').val();
	var severity = $('#edema_severity option:selected').val();
	//var time = $('#abc_time option:selected').val();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE abc SET assessed=?, open_patent=?, tracheal_deviation=?, tracheal_deviation_side=?, interventions=?, breathing_type=?, laboured=?, effective=?, ' +	//7
				'accessory_muscle=?, nasal_flare=?, cough=?, productive=?, subcut_emph=?, flailed_chest=?, flailed_chest_side=?, suspect_pneu=?, ' +	//8
				'suspect_hemo=?, ctax4=?, ul_sound=?, ur_sound=?, ll_sound=?, lr_sound=?, pulse_location=?, pulse_regularity=?, pulse_quality=?, jvd=?, ' +		//9
				'cap_refill=?, skin=?, abctemp=?, dry=?, heart_tones=?, heart_tones_quality=?, peripheral_edema=?, peripheral_edema_location=?, ' +
				'edema_severity=?, time=? WHERE patient=?;', 										//5
				['true', o_p, t_d, t_d_s, interv, b_t, laboured, effective, a_m, n_f, cough, productive, s_e, f_c, f_c_s, s_p, s_h,	//16
				ctax4, ulls, urls, llls, lrls, p_l, p_r, p_q, jvd, c_r, skin, temp, dry, h_t, h_t_q, p_e, edema_loc,
				severity, getSystemTime(), getCurrentPatientId()], //22
				function(){
					if (link == "#airwayProcedures")
							redirect('#airwayProcedures', 'swap');
						else
							jQT.goBack();
				},
				errorHandler
			);
		} 
	); 
}

/***********************************************************************************/
/* 						is there a trauma				*/
/***********************************************************************************/
function loadTrauma() {
	$('#is_trauma').prop('checked', false);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						$('#is_trauma').prop('checked', getBool(row.isTrauma));				
					}
					if ($('#is_trauma').prop('checked') == false){
						$('#traumaTypes li').hide();
						$('#li_is_trauma').show();
					}
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						is there a trauma				*/
/***********************************************************************************/
function saveTrauma() {
	var is_Trauma = $('#is_trauma').prop('checked');
	var fix;
	if (is_Trauma == true)
		fix = false;
	else
		fix = true;
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE trauma SET isTrauma=? WHERE patient=?;', 
				[fix, getCurrentPatientId()], 
				null,
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						load auto trauma into fields matching patient id				*/
/***********************************************************************************/
function loadAuto() {
	$('#car_seats div').css("background", "white");
	$('#car_seats div').data('status', 'negative');
	$('#motorcycle_seats div').css("background", "white");
	$('#motorcycle_seats div').data('status', 'negative');
	var seat = "";
	resetPicture('traumaAutoImage');
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_auto WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#car').prop('checked', getBool(row.car));
						$('#seatbelt').prop('checked', getBool(row.seatbelt));
						$('#airbag').prop('checked', getBool(row.airbag));
						$('#helmet').prop('checked', getBool(row.helmet));
						$('#leathers').prop('checked', getBool(row.leathers));
						$('#nb_occupants').val(row.nb_occupants);
						$('#approx_speed').val(row.approx_speed);
						$('#speed_unit').prop('checked', getBool(row.speed_unit));
						$('#removed_by').val(row.removed_by);					
						$('#per').val(row.per);					
						setPicture('traumaAutoImage', row.photo);
						seat = row.seat;
					}	
					reflectCarMoto(seat);
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save auto trauma into fields matching patient id				*/
/***********************************************************************************/
function saveAuto() {
	var car = $('#car').prop('checked');
	var seatbelt = $('#seatbelt').prop('checked');
	var airbag = $('#airbag').prop('checked');
	var helmet = $('#helmet').prop('checked');
	var leathers = $('#leathers').prop('checked');
	var nb_occ = $('#nb_occupants').val();
	var approx_speed = $('#approx_speed').val();
	var speed_unit = $('#speed_unit').prop('checked');
	var removed_by = $('#removed_by option:selected').val();
	var per = $('#per option:selected').val();
	var photo = document.getElementById('traumaAutoImage').src;
	if (photo.substr(0,4) != "data") photo = '';

	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE trauma_auto SET assessed=?, car=?, seat=?, seatbelt=?, airbag=?, helmet=?, leathers=?, nb_occupants=?, approx_speed=?, ' +
				'speed_unit=?, removed_by=?, per=?, photo=?, time=? WHERE patient=?;',
				['true', car, findSeat(), seatbelt, airbag, helmet, leathers, nb_occ, approx_speed, speed_unit, removed_by, per, photo, getSystemTime(), getCurrentPatientId()], 
				function(){	
					jQT.goBack();														// on va a la page d'avant
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						find the patient's seat										*/
/***********************************************************************************/
function findSeat(){
	var seat = "";
	$('#car_seats div').each(function(index){
		if ($(this).data('status') == 'positive'){
			seat = $(this).prop("id");
		}
	});
	$('#motorcycle_seats div').each(function(index){
		if ($(this).data('status') == 'positive'){
			seat = $(this).prop("id");
		}
	});
	return seat;
}

/***********************************************************************************/
/* 						get penetrating trauma into fields matching patient id				*/
/***********************************************************************************/
function loadPenetrating() {
	resetPicture('traumaPenetrImage');
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_penetrating WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#assault_penetrating').prop('checked', getBool(row.assault));
						$('#moi_penetrating').val(row.moi);
						$('#velocity_penetrating').prop('checked', getBool(row.velocity));
						$('#bleeding_penetrating').prop('checked', getBool(row.bleeding));
						$('#controlled_penetrating').prop('checked', getBool(row.controled));
						$('#head_penetrating').prop('checked', getBool(row.head));
						$('#neck_penetrating').prop('checked', getBool(row.neck));
						$('#chest_penetrating').prop('checked', getBool(row.chest));
						$('#abd_penetrating').prop('checked', getBool(row.abd));
						$('#pelvis_penetrating').prop('checked', getBool(row.pelvis));
						$('#ulxr_penetrating').prop('checked', getBool(row.ulxr));
						$('#urxr_penetrating').prop('checked', getBool(row.urxr));
						$('#llxr_penetrating').prop('checked', getBool(row.llxr));
						$('#lrxr_penetrating').prop('checked', getBool(row.lrxr));
						$('#back_penetrating').prop('checked', getBool(row.back));
						setPicture('traumaPenetrImage', row.photo);		
					}
					reflectDB('#bleeding_penetrating', '#li_penetrating_bleeding_controlled');
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save penetrating trauma into fields matching patient id				*/
/***********************************************************************************/
function savePenetrating() {
	var assault = $('#assault_penetrating').prop('checked');
	var moi = $('#moi_penetrating').val();
	var velocity = $('#velocity_penetrating').prop('checked');
	var bleeding = $('#bleeding_penetrating').prop('checked');
	var controlled = $('#controlled_penetrating').prop('checked');
	var head = $('#head_penetrating').prop('checked');
	var neck = $('#neck_penetrating').prop('checked');
	var chest = $('#chest_penetrating').prop('checked');
	var abd = $('#abd_penetrating').prop('checked');
	var pelvis = $('#pelvis_penetrating').prop('checked');
	var ulxr = $('#ulxr_penetrating').prop('checked');
	var urxr = $('#urxr_penetrating').prop('checked');
	var llxr = $('#llxr_penetrating').prop('checked');
	var lrxr = $('#lrxr_penetrating').prop('checked');
	var back = $('#back_penetrating').prop('checked');
	var photo = document.getElementById('traumaPenetrImage').src;
	if (photo.substr(0,4) != "data") photo = '';
	
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE trauma_penetrating SET assessed=?, assault=?, moi=?, velocity=?, bleeding=?, controlled=?, head=?, neck=?, chest=?, abd=?, ' +
				' pelvis=?, ulxr=?, urxr=?, llxr=?, lrxr=?, back=?, photo=?, time=? WHERE patient=?;', 
				['true', assault, moi, velocity, bleeding, controlled, head, neck, chest, abd, pelvis, ulxr, urxr, llxr, lrxr,
				back, photo, getSystemTime(), getCurrentPatientId()], 
				function(){	
					jQT.goBack();														// on va a la page d'avant
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						get blunt trauma into fields matching patient id				*/
/***********************************************************************************/
function loadBlunt() {
	resetPicture('traumaBluntImage');
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_blunt WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#assault_blunt').prop('checked', getBool(row.assault));
						$('#moi_blunt').val(row.moi);
						$('#velocity_blunt').prop('checked', getBool(row.velocity));
						$('#bleeding_blunt').prop('checked', getBool(row.bleeding));
						$('#controlled_blunt').prop('checked', getBool(row.controled));
						$('#head_blunt').prop('checked', getBool(row.head));
						$('#neck_blunt').prop('checked', getBool(row.neck));
						$('#chest_blunt').prop('checked', getBool(row.chest));
						$('#abd_blunt').prop('checked', getBool(row.abd));
						$('#pelvis_blunt').prop('checked', getBool(row.pelvis));
						$('#ulxr_blunt').prop('checked', getBool(row.ulxr));
						$('#urxr_blunt').prop('checked', getBool(row.urxr));
						$('#llxr_blunt').prop('checked', getBool(row.llxr));
						$('#lrxr_blunt').prop('checked', getBool(row.lrxr));
						$('#back_blunt').prop('checked', getBool(row.back));
						setPicture('traumaBluntImage', row.photo);		
					}
					reflectDB('#bleeding_blunt', '#li_blunt_bleeding_controlled');
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save blunt trauma into fields matching patient id				*/
/***********************************************************************************/
function saveBlunt() {
	var assault = $('#assault_blunt').prop('checked');
	var moi = $('#moi_blunt').val();
	var velocity = $('#velocity_blunt').prop('checked');
	var bleeding = $('#bleeding_blunt').prop('checked');
	var controlled = $('#controlled_blunt').prop('checked');
	var head = $('#head_blunt').prop('checked');
	var neck = $('#neck_blunt').prop('checked');
	var chest = $('#chest_blunt').prop('checked');
	var abd = $('#abd_blunt').prop('checked');
	var pelvis = $('#pelvis_blunt').prop('checked');
	var ulxr = $('#ulxr_blunt').prop('checked');
	var urxr = $('#urxr_blunt').prop('checked');
	var llxr = $('#llxr_blunt').prop('checked');
	var lrxr = $('#lrxr_blunt').prop('checked');
	var back = $('#back_blunt').prop('checked');
	var photo = document.getElementById('traumaBluntImage').src;
	if (photo.substr(0,4) != "data") photo = '';

	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE trauma_blunt SET assessed=?, assault=?, moi=?, bleeding=?, controlled=?, head=?, neck=?, chest=?, abd=?, ' +
				' pelvis=?, ulxr=?, urxr=?, llxr=?, lrxr=?, back=?, photo=?, time=? WHERE patient=?;', 
				['true', assault, moi, bleeding, controlled, head, neck, chest, abd, pelvis, ulxr, urxr, llxr, lrxr, back, photo, getSystemTime(), getCurrentPatientId()], 
				function(){	
					jQT.goBack();														// on va a la page d'avant
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						get falls trauma into fields matching patient id				*/
/***********************************************************************************/
function loadFalls() {
	$('#distance_fall_unit').prop('checked', false);
	resetPicture('traumaBluntImage');
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_fall WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#assault_fall').prop('checked', getBool(row.assault));
						$('#distance_fall').val(row.distance);
						$('#distance_fall_unit').prop('checked', getBool(row.distance_unit));
						$('#surface_fall').val(row.surface);
						$('#loss_of_c_fall').prop('checked', getBool(row.loss_of_c));
						$('#time_loss_of_c_fall').val(row.loss_of_c_time);
						$('#bleeding_fall').prop('checked', getBool(row.bleeding));
						$('#controlled_fall').prop('checked', getBool(row.controled));
						$('#head_fall').prop('checked', getBool(row.head));
						$('#neck_fall').prop('checked', getBool(row.neck));
						$('#chest_fall').prop('checked', getBool(row.chest));
						$('#abd_fall').prop('checked', getBool(row.abd));
						$('#pelvis_fall').prop('checked', getBool(row.pelvis));
						$('#ulxr_fall').prop('checked', getBool(row.ulxr));
						$('#urxr_fall').prop('checked', getBool(row.urxr));
						$('#llxr_fall').prop('checked', getBool(row.llxr));
						$('#lrxr_fall').prop('checked', getBool(row.lrxr));
						$('#back_fall').prop('checked', getBool(row.back));
						setPicture('traumaFallImage', row.photo);			
					}
					reflectDB('#loss_of_c_fall', '#li_loss_of_c_time');
					reflectDB('#bleeding_fall', '#li_controlled_fall');
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save fall trauma into fields matching patient id				*/
/***********************************************************************************/
function saveFalls() {
	var assault = $('#assault_fall').prop('checked');
	var distance = $('#distance_fall').val();
	var unit = $('#distance_fall_unit').prop('checked');
	var surface = $('#surface_fall').val();
	var loc = $('#loss_of_c_fall').prop('checked');
	var loc_time = $('#time_loss_of_c_fall').val();
	var bleeding = $('#bleeding_fall').prop('checked');
	var controlled = $('#controlled_fall').prop('checked');
	var head = $('#head_fall').prop('checked');
	var neck = $('#neck_fall').prop('checked');
	var chest = $('#chest_fall').prop('checked');
	var abd = $('#abd_fall').prop('checked');
	var pelvis = $('#pelvis_fall').prop('checked');
	var ulxr = $('#ulxr_fall').prop('checked');
	var urxr = $('#urxr_fall').prop('checked');
	var llxr = $('#llxr_fall').prop('checked');
	var lrxr = $('#lrxr_fall').prop('checked');
	var back = $('#back_fall').prop('checked');
	var photo = document.getElementById('traumaFallImage').src;
	if (photo.substr(0,4) != "data") photo = '';

	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE trauma_fall SET assessed=?, assault=?, distance=?, distance_unit=?, surface=?, loss_of_c=?, loss_of_c_time=?, ' +
				' bleeding=?, controlled=?, head=?, neck=?, chest=?, abd=?, ' +
				' pelvis=?, ulxr=?, urxr=?, llxr=?, lrxr=?, back=?, photo=?, time=? WHERE patient=?;',
				['true', assault, distance, unit, surface, loc, loc_time, bleeding, controlled, head, neck, chest, abd, pelvis,
				ulxr, urxr, llxr, lrxr, back, photo, getSystemTime(), getCurrentPatientId()], 
				function(){	
					jQT.goBack();														// on va a la page d'avant
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						get burn trauma into fields matching patient id				*/
/***********************************************************************************/
function loadBurn() {
	// reset all data fields
	init_body_parts();
	burnToggle('adult');
	resetPicture('traumaBurnImage');
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_burn WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#burn_head_front').data('burn_degree', row.head_front);
						$('#burn_head_back').data('burn_degree', row.head_back);
						$('#burn_chest').data('burn_degree', row.chest);
						$('#burn_abdomen').data('burn_degree', row.abdomen);
						$('#burn_upper_back').data('burn_degree', row.upper_back);
						$('#burn_lower_back').data('burn_degree', row.lower_back);
						$('#burn_ulx_up_front').data('burn_degree', row.ulx_up_front);
						$('#burn_ulx_low_front').data('burn_degree', row.ulx_low_front);
						$('#burn_ulx_up_back').data('burn_degree', row.ulx_up_back);
						$('#burn_ulx_low_back').data('burn_degree', row.ulx_low_back);
						$('#burn_urx_up_front').data('burn_degree', row.urx_up_front);
						$('#burn_urx_low_front').data('burn_degree', row.urx_low_front);
						$('#burn_urx_up_back').data('burn_degree', row.urx_up_back);
						$('#burn_urx_low_back').data('burn_degree', row.urx_low_back);
						$('#burn_llx_up_front').data('burn_degree', row.llx_up_front);
						$('#burn_llx_low_front').data('burn_degree', row.llx_low_front);
						$('#burn_llx_up_back').data('burn_degree', row.llx_up_back);
						$('#burn_llx_low_back').data('burn_degree', row.llx_low_back);
						$('#burn_lrx_up_front').data('burn_degree', row.lrx_up_front);
						$('#burn_lrx_low_front').data('burn_degree', row.lrx_low_front);
						$('#burn_lrx_up_back').data('burn_degree', row.lrx_up_back);
						$('#burn_lrx_low_back').data('burn_degree', row.lrx_low_back);
						burnToggle(row.body_type);
						$('#burn_body_parts img').each(function(index){renderColors(this)});
						setPicture('traumaBurnImage', row.photo);
					}
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save burn trauma into fields matching patient id				*/
/***********************************************************************************/
function saveBurn() {
	var h_f = $('#burn_head_front').data('burn_degree');
	var h_b = $('#burn_head_back').data('burn_degree');
	var chest = $('#burn_chest').data('burn_degree');
	var abd = $('#burn_abdomen').data('burn_degree');
	var u_b = $('#burn_upper_back').data('burn_degree');
	var l_b = $('#burn_lower_back').data('burn_degree');
	var ulx_up_f = $('#burn_ulx_up_front').data('burn_degree');
	var ulx_low_f = $('#burn_ulx_low_front').data('burn_degree');
	var ulx_up_b = $('#burn_ulx_up_back').data('burn_degree');
	var ulx_low_b = $('#burn_ulx_low_back').data('burn_degree');
	var urx_up_f = $('#burn_urx_up_front').data('burn_degree');
	var urx_low_f = $('#burn_urx_low_front').data('burn_degree');
	var urx_up_b = $('#burn_urx_up_back').data('burn_degree');
	var urx_low_b = $('#burn_urx_low_back').data('burn_degree');
	var llx_up_f = $('#burn_llx_up_front').data('burn_degree');
	var llx_low_f = $('#burn_llx_low_front').data('burn_degree');
	var llx_up_b = $('#burn_llx_up_back').data('burn_degree');
	var llx_low_b = $('#burn_llx_low_back').data('burn_degree');
	var lrx_up_f = $('#burn_lrx_up_front').data('burn_degree');
	var lrx_low_f = $('#burn_lrx_low_front').data('burn_degree');
	var lrx_up_b = $('#burn_lrx_up_back').data('burn_degree');
	var lrx_low_b = $('#burn_lrx_low_back').data('burn_degree');
	var surf = $('#total_burn_percentage').val();
	var photo = document.getElementById('traumaBurnImage').src;
	if (photo.substr(0,4) != "data") photo = '';
	
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE trauma_burn SET assessed=?, head_front = ?, head_back = ?, chest = ?, abdomen = ?, upper_back = ?, lower_back = ?, ' +
				' ulx_up_front = ?, ulx_low_front = ?, ulx_up_back = ?, ulx_low_back = ?, urx_up_front = ?, urx_low_front = ?, urx_up_back = ?, urx_low_back = ?, ' +
				' llx_up_front = ?, llx_low_front = ?, llx_up_back = ?, llx_low_back = ?, lrx_up_front = ?, lrx_low_front = ?, lrx_up_back = ?, lrx_low_back = ?, ' +
				' total_surface = ?, body_type = ?, photo = ?, time = ?' +
				' WHERE patient = ? ;', 
				['true', h_f, h_b, chest, abd, u_b, l_b, ulx_up_f, ulx_low_f, ulx_up_b, ulx_low_b, urx_up_f, urx_low_f, urx_up_b, urx_low_b, 
				llx_up_f, llx_low_f, llx_up_b, llx_low_b,
				lrx_up_f, lrx_low_f, lrx_up_b, lrx_low_b, surf,
				bodyType, photo, getSystemTime(), getCurrentPatientId()], 
				function(){	
					jQT.goBack();														// on va a la page d'avant
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						get GIGU into fields matching patient id				*/
/***********************************************************************************/
function loadGIGU() {
	gi_guToggle('gi');
	$('#gi_assessed').prop('checked', false);
	$('#rebound').prop('checked', false);
	$('#gu_assessed').prop('checked', false);
	$('#div_guDetails li input[type="checkbox"]').prop('checked', false);
	$('#gi_pain_location li input[type="checkbox"]').prop('checked', false);
	$('#obese').prop('checked', false);
	$('#vaginal_discharge').prop('checked', false);
	$('#know_gestation').prop('checked', true);
	$('#membrane_intact').prop('checked', true);
	$('#fetal_movement').prop('checked', false);
	//initialise body parts
	$('#gi_outline div').data('green', false);
	$('#gi_outline div').css('background', 'white');
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM gi_gu WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#gi_assessed').prop('checked', getBool(row.gi_assessed));
						$('#flat').prop('checked', getBool(row.flat));
						$('#soft').prop('checked', getBool(row.soft));
						$('#tender').prop('checked', getBool(row.tender));
						$('#rebound').prop('checked', getBool(row.rebound));
						$('#gi_luq').data('green', getBool(row.luq));
						$('#gi_ruq').data('green', getBool(row.ruq));
						$('#gi_llq').data('green', getBool(row.llq));
						$('#gi_rlq').data('green', getBool(row.rlq));
						$('#epigastric').data('green', getBool(row.epigastric));
						$('#suprapubic').data('green', getBool(row.suprapubic));
						$('#obese').prop('checked', getBool(row.obese));
						$('#gi_last_bm').val(row.last_bm);
						$('#gi_loi').val(row.loi);
						$('#gu_assessed').prop('checked', getBool(row.gu_assessed));
						$('#gu_pain').prop('checked', getBool(row.pain));
						$('#gu_frequency').prop('checked', getBool(row.frequency));
						$('#hematuria').prop('checked', getBool(row.hematuria));
						$('#incontinence').prop('checked', getBool(row.incontinence));
						$('#bladder_distention').prop('checked', getBool(row.bladder_distention));
						$('#urinary_urgency').prop('checked', getBool(row.urinary_urgency));
						$('#gu_last_void').prop('checked', getBool(row.last_void));
						$('#gravid').val(row.gravid);
						$('#term').val(row.term);
						$('#para').val(row.para);
						$('#abortia').val(row.abortia);
						$('#live').val(row.live);
						$('#last_menstruation').val(row.last_menstruation);
						$('#vaginal_discharge').prop('checked', getBool(row.discharge));
						$('#discharge_substance').val(row.substance);
						$('#pregnant').val(row.pregnant);
						$('#edc').val(row.edc);
						$('#know_gestation').prop('checked', getBool(row.gestation_known));
						$('#gestation_weeks').val(row.gest_weeks);	
						$('#membrane_intact').prop('checked', getBool(row.membr_intact));
						$('#membrane_ruptured').val(row.time_ruptured);
						$('#membrane_fluid').val(row.fluid);
						$('#expected_babies').val(row.expected_babies);
						$('#fetal_movement').prop('checked', getBool(row.fetal_mvmt));	
						$('#last_movement').val(row.last_mvmt);						
						$('#movement_per_hr').val(row.mvmt_per_hr);	
						$('#contractions').prop('checked', getBool(row.contractions));	
						$('#contraction_duration').val(row.contraction_duration);						
						$('#contraction_separation').val(row.contraction_separation);						
						//$('#gi_gu_time').val(row.time);			
					}
					reflectDB('#gi_assessed', '#div_giDetails');
					reflectDB('#gu_assessed', '#div_guDetails');
					reflectDB('#vaginal_discharge', '#li_discharge_substance');
					reflectDB('#know_gestation', '#li_gestation_weeks');
					reflectDB('#fetal_movement', '#div_movement_related');
					reflectDB('#contractions', '#li_contractions_related');
					reflectDBReverse('#membrane_intact', '#div_membrane_related');
					reflect_select('#pregnant', 1, '#div_pregnant_related');
					reflect_select('#pregnant', 1, '#link_field_delivery');
					$('#gi_outline div').each(function(index){
						if ($(this).data('green') == true)
							$(this).css('background', 'green');
					});
				}
			);
		}
	);
	// But wait a minute, is it a female ?
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM patients WHERE id=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						if (getBool(row.gender) == true){
							$('.female_related').hide();
						}
						else{
							// Show the female option
							$('.female_related').show();
						}
					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM abc WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);	
						$('#gyn_edema').prop('checked', getBool(row.peripheral_edema));
						$('#gyn_edema_location').val(row.peripheral_edema_location);
						$('#gyn_edema_severity').val(row.edema_severity);
					}
					reflectDB('#gyn_edema', '#div_gyn_edema_details');
				}
			)
		}
	)
}

/***********************************************************************************/
/* 						save GIGU into fields matching patient id				*/
/***********************************************************************************/
function saveGIGU(link) {
	var success = false;
	var gi_as = $('#gi_assessed').prop('checked');
	var flat = $('#flat').prop('checked');
	var soft = $('#soft').prop('checked');
	var tender = $('#tender').prop('checked');
	var reb = $('#rebound').prop('checked');
	var luq = $('#gi_luq').data('green');
	var ruq = $('#gi_ruq').data('green');
	var llq = $('#gi_llq').data('green');
	var rlq = $('#gi_rlq').data('green');
	var epig = $('#epigastric').data('green');
	var supra = $('#suprapubic').data('green');
	var obese = $('#obese').prop('checked');
	var last_bm = $('#gi_last_bm').val();
	var loi = $('#gi_loi').val();
	var gu_as = $('#gu_assessed').prop('checked');
	var pain = $('#gu_pain').prop('checked');
	var freq = $('#gu_frequency').prop('checked');
	var hema = $('#hematuria').prop('checked');
	var incon = $('#incontinence').prop('checked');
	var bladder = $('#bladder_distention').prop('checked');
	var urin = $('#urinary_urgency').prop('checked');
	var last_v = $('#gu_last_void').val();
	var gra = $('#gravid').val();
	var term = $('#term').val();
	var para = $('#para').val();
	var abor = $('#abortia').val();
	var live = $('#live').val();
	var last_m = $('#last_menstruation').val();
	var vag_dis = $('#vaginal_discharge').prop('checked');
	var dis_subs = $('#discharge_substance').val();
	var preg = $('#pregnant option:selected').val();
	var edc = $('#edc').val();
	var know_gest = $('#know_gestation').prop('checked');
	var gest_week = $('#gestation_weeks').val();	
	var memb_intact = $('#membrane_intact').prop('checked');
	var memb_rupt_time = $('#membrane_ruptured').val();
	var memb_fluid = $('#membrane_fluid').val();
	var expected_b = $('#expected_babies').val();	
	var fetal_mvmt = $('#fetal_movement').prop('checked');	
	var last_mvmt = $('#last_movement').val();						
	var mvmt_per_hr = $('#movement_per_hr').val();	
	var contractions = $('#contractions').prop('checked');	
	var contr_duration = $('#contraction_duration').val();						
	var contr_separation = $('#contraction_separation').val();	
	//var time = $('#gi_gu_time option:selected').val();		
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				' UPDATE gi_gu SET gi_assessed=?, flat=?, soft=?, tender=?, rebound=?, luq=?, ruq=?, llq=?, rlq=?, epigastric=?, suprapubic=?, ' + //12
				' obese=?, last_bm=?, loi=?, gu_assessed=?, pain=?, frequency=?, hematuria=?, incontinence=?, bladder_distention=?, urinary_urgency=?, last_void=?, ' +//11
				' gyn_assessed=?, gravid=?, term=?, para=?, abortia=?, live=?, last_menstruation=?, discharge=?, substance=?, pregnant=?, edc=?, gestation_known=?, gest_weeks=?, ' + //12
				' membr_intact=?, time_ruptured=?, fluid=?, expected_babies=?, fetal_mvmt=?, last_mvmt=?, mvmt_per_hr=?, contractions=?, contraction_duration=?, ' +
				' contraction_separation=?, time=? WHERE patient=?;', //4
				[gi_as, flat, soft, tender, reb, luq, ruq, llq, rlq, epig, supra, obese, last_bm, loi, gu_as, pain, freq, hema,
				incon, bladder, urin, last_v, 'true', gra, term, para, abor, live, last_m, vag_dis, dis_subs, preg, edc, know_gest, gest_week,
				memb_intact, memb_rupt_time, memb_fluid, expected_b, fetal_mvmt, last_mvmt, mvmt_per_hr, contractions, contr_duration,
				contr_separation, getSystemTime(), getCurrentPatientId()], 
				function(){
					success = true;
				},
				errorHandler
			);
		}
	);
	
	// Refresh the Edema part in the circulation page
	var edema = $('#gyn_edema').prop('checked');
	var location = $('#gyn_edema_location').val();
	var severity = $('#gyn_edema_severity').val();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				' UPDATE abc SET peripheral_edema=?, peripheral_edema_location=?, edema_severity=?  WHERE patient=?;',
				[edema, location, severity, getCurrentPatientId()], 
				function(){	
					if (success == true){
						if (link == "#field_delivery")
							redirect('#field_delivery', 'pop');
						else
							jQT.goBack();
					}
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						load Field Delivery				*/
/***********************************************************************************/
function loadFieldDelivery() {
	$('#field_delivery_stimulation').prop('checked', false);
	$('#field_delivery_placenta').prop('checked', true);
	$('#field_delivery_placenta_intact').prop('checked', false);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM field_delivery WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#field_delivery_presentation').val(row.presentation);
						$('#field_delivery_time_delivery').val(row.delivery_time);
						$('#field_delivery_meconium').val(row.meconium);
						$('#field_delivery_cord_length').val(row.cord_length);
						$('#field_delivery_apgar1').val(row.apgar1);
						$('#field_delivery_apgar5').val(row.apgar5);
						$('#field_delivery_stimulation').prop('checked', getBool(row.stimulation));
						$('#field_delivery_stimulation_type').val(row.stimulation_type);
						$('#field_delivery_placenta').prop('checked', getBool(row.placenta));
						$('#field_delivery_time_placenta').val(row.placenta_time);
						$('#field_delivery_placenta_intact').prop('checked', getBool(row.placenta_intact));
					}
					reflectDB('#field_delivery_stimulation', '#li_stimulation_related');
				}
			)
		}
	)
}

/***********************************************************************************/
/* 						save Field Delivery				*/
/***********************************************************************************/
function saveFieldDelivery() {
	var presentation = $('#field_delivery_presentation').val();
	var time_delivery = $('#field_delivery_time_delivery').val();
	var meconium = $('#field_delivery_meconium').val();
	var cord = $('#field_delivery_cord_length').val();
	var apgar1 = $('#field_delivery_apgar1').html();
	var apgar5 = $('#field_delivery_apgar5').html();
	var stimul = $('#field_delivery_stimulation').prop('checked');
	var stimul_type = $('#field_delivery_stimulation_type').val();
	var placenta = $('#field_delivery_placenta').prop('checked');
	var placenta_time = $('#field_delivery_time_placenta').val();
	var placenta_intact = $('#field_delivery_placenta_intact').prop('checked');
	//var time = $('#field_delivery_time').html();		
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE field_delivery SET assessed=?, presentation=?, delivery_time=?, meconium=?, cord_length=?, apgar1=?, apgar5=?, stimulation=?, ' +
				' stimulation_type=?, placenta=?, placenta_time=?, placenta_intact=?, time=? WHERE patient=?;',
				['true', presentation, time_delivery, meconium, cord, apgar1, apgar5, stimul, stimul_type, placenta, placenta_time,
				placenta_intact, getSystemTime(), getCurrentPatientId()], 
				function(){	
					jQT.goBack();														// on va a la page d'avant
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 									Current Minute										*/
/***********************************************************************************/
function selectMinute(min){
	if (min == '1min')
		APGAR_min1 = true;
	else
		APGAR_min1 = false;
	loadApgar();
}
/***********************************************************************************/
/* 									APGAR Totals										*/
/***********************************************************************************/
function getAPGARtotals(){
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM apgar WHERE patient = ?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);						
						$('#field_delivery_apgar1').text('1 Min: ' + row.total1);
						$('#neuro_apgar1').text('1 Min: ' + row.total1);
						$('#field_delivery_apgar5').text('5 Min: ' + row.total5);
						$('#neuro_apgar5').text('5 Min: ' + row.total5);
					}
				}
			);
		}
	);
}

/***********************************************************************************/
/* 									load Apgar										*/
/***********************************************************************************/
function loadApgar() {
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM apgar WHERE patient = ?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						if (APGAR_min1 == true){
							$('#apgar_appearance').val(row.appearance1);
							$('#apgar_pulse_rate').val(row.pulse1);
							$('#apgar_grimace').val(row.grimace1);
							$('#apgar_activity').val(row.activity1);
							$('#apgar_respiratory').val(row.respirations1);
							$('#apgar_total').val(row.total1);
							$('#apgar .toolbar h1').text("APGAR: 1 minute");
						}
						if (APGAR_min1 == false){
							$('#apgar_appearance').val(row.appearance5);
							$('#apgar_pulse_rate').val(row.pulse5);
							$('#apgar_grimace').val(row.grimace5);
							$('#apgar_activity').val(row.activity5);
							$('#apgar_respiratory').val(row.respirations5);
							$('#apgar_total').val(row.total5);
							$('#apgar .toolbar h1').text("APGAR: 5 minutes");
						}
					}
					calculateTotalApgar();
				}
			)
		}
	)
}

/***********************************************************************************/
/* 									save Apgar										*/
/***********************************************************************************/
function saveApgar() {
	var appear = $('#apgar_appearance').val();
	var pulse = $('#apgar_pulse_rate').val();
	var grimace = $('#apgar_grimace').val();
	var activity = $('#apgar_activity').val();
	var respi = $('#apgar_respiratory').val();
	var total = calculateTotalApgar();
	var request1 = 'UPDATE apgar set appearance1=?, pulse1=?, grimace1=?, activity1=?, respirations1=?, total1=?, time1=? WHERE patient=?;';
	var request5 = 'UPDATE apgar set appearance5=?, pulse5=?, grimace5=?, activity5=?, respirations5=?, total5=?, time5=? WHERE patient=?;';
	var query;
	if (APGAR_min1 == true){
		query = request1;
		$('#field_delivery_apgar1').text('1 Min: ' + total);
		$('#neuro_apgar1').text('1 Min: ' + total);
	}
	else{
		query = request5;
		$('#field_delivery_apgar5').text('5 Min: ' + total);
		$('#neuro_apgar5').text('5 Min: ' + total);
	}
		
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				query,
				[appear, pulse, grimace, activity, respi, total, getSystemTime(), getCurrentPatientId()], 
				function(){	
					jQT.goBack();														// on va a la page d'avant
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						get Muscular skeletal into fields matching patient id				*/
/***********************************************************************************/
function loadMuscularSkeletal() {
	// Collapse the lists by default and open the one containing something
	$('#div_complaints ul.grid5Column').each(function(index) {
		toggleElement($(this));
	});
	$('#div_complaints ul.grid5Column li').each(function(index) {
		$(this).data("status", "negative");
	});
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM muscular_skeletal WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						// Check if there's a cpmplaint
						if (row.nocomplaint == 'false'){
							if (row.muscular != ''){
								var arrayDB = (row.muscular).split(",");
								listMuscular = arrayDB;
							}
							if (listMuscular.length != 0){
								for (var i=0; i < listMuscular.length; i++) {
									var myLi = $('#div_complaints').find("#" +listMuscular[i]);
									oneTap_one_color_button(myLi);
									if ($(myLi).parent().css("display", "none")){
										$(myLi).parent().show();
									}
								}
							}
							$('#muscular_skeletal_no_complaints').prop('checked', false);
						}
					}
					reflectDBReverse('#muscular_skeletal_no_complaints', '#div_complaints');
				}
			);
		}
	);
}

/***********************************************************************************/

/* 						save Muscular Skeletal into fields matching patient id				*/
/***********************************************************************************/
function saveMuscularSkeletal() {
	// Complaint ?
	var noComplaint = $('#muscular_skeletal_no_complaints').prop('checked');
	// Clear List
	listMuscular = [];
	// Then fill the list
	$('#div_complaints ul.grid5Column li').each(function(index) {
		if ($(this).data("status") == "positive"){
			listMuscular.push($(this).prop("id"));
		}
	});
	var muscularPb = listMuscular.join(",");
	// If there's no complaint, default muscularPb to nothing
	if (noComplaint == true)
		muscularPb = "";
		
 	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE muscular_skeletal SET assessed=?, nocomplaint = ?, muscular = ?' +
				' WHERE patient = ? ;', 
				['true', noComplaint, muscularPb, getCurrentPatientId()], 
				function(){	
					jQT.goBack();														
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 							Load Record List 								*/
/***********************************************************************************/
function loadRecordsList(ul_sortedId, tableName, templateId, recordTime, goToId) {
	
	// Show the side menu
	showPatientPageWidget();
	
    $(ul_sortedId + ' li:gt(0)').remove();
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'SELECT id, patient, time FROM ' + tableName + ' WHERE patient = ? ORDER BY CAST(time AS INT);',
				[getCurrentPatientId()],
                function (transaction, result) {
                    for (var i=0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        var newEntryRow = $(templateId).clone();
                        newEntryRow.removeAttr('id');
                        newEntryRow.removeAttr('style');
                        newEntryRow.data('entryId', row.id);
                        newEntryRow.appendTo(ul_sortedId);
                        newEntryRow.find(recordTime).text(getFullFormatedTime(row.time));
						newEntryRow.find(recordTime).parent().bind('click', function(e){
							var clickedRecord = $(this);
							var clickedRecordId = clickedRecord.data('entryId');
							setCurrentRecord(clickedRecordId);
							jQT.goTo(goToId, 'flip'); 
						});
                        newEntryRow.find('.delete').bind('touchstart', function(e){
							var clickedRecord = $(this).parent();
							var clickedRecordId = clickedRecord.data('entryId');
							deleteRecordById(clickedRecordId, tableName);
							clickedRecord.slideUp();
							e.stopPropagation();
						});
						newEntryRow.find('.delete').bind('click', function(e){
							e.stopPropagation();
							event.preventDefault();
						});
						newEntryRow.find('.unlock_line').bind('touchstart', function(e){
							var clickedRecord = $(this).parent();
							var clickedRecordId = clickedRecord.data('entryId');
							delete_show_hide(this);
							e.stopPropagation();
						});
						newEntryRow.find('.unlock_line').bind('click', function(e){
							e.stopPropagation();
							event.preventDefault();
						});

                    }
                }, 
                errorHandler
            );
        }
    );
}
/***********************************************************************************/
/* 						Additional functions for Record list				*/
/***********************************************************************************/
function deleteRecordById(id, tableName) {
	db.transaction(
		function(transaction) {
			transaction.executeSql('DELETE FROM ' + tableName + ' WHERE id=?;',
			[id], null, errorHandler);
		}
	);
}

function setCurrentRecord(recId){
	sessionStorage.currentRecordId = recId;
}
function getCurrentRecord(){
	return sessionStorage.currentRecordId;
}
function resetCurrentRecord(){
	sessionStorage.currentRecordId = '0';
}

/***********************************************************************************/
/* 							Load Airway List 								*/
/***********************************************************************************/
function loadAirwayList() {
	 loadRecordsList('#airway_sorted', 'airway', '#airwayTemplate', '.airway_time', '#airwayProcedure');
}

/***********************************************************************************/
/* 						get Airway into fields matching patient id				*/
/***********************************************************************************/
function loadAirway() {
	ClearAllFields();
	$('#airway_time').val(getFormatedDate(getSystemTime()));
	
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM airway WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#airway_O2').val(row.oxygen);
							$('#basic_maneuvers').val(row.basic_maneuvers);
							$('#opa').val(row.opa);
							$('#npa').val(row.npa);
							$('#bvm').prop('checked', getBool(row.bvm));
							$('#airway_rate').val(row.rate);
							$('#airway_time').val(getFormatedDate(row.time));
							setMobiscroll(row.time, '#airway_time');
						}
					}
				);
			}
		);
	}
}

/***********************************************************************************/
/* 						save Airway into fields matching patient id				*/
/***********************************************************************************/
function saveAirway() {
	var oxygen = $('#airway_O2').val();
	var b_man = $('#basic_maneuvers option:selected').val();
	var opa = $('#opa option:selected').val();
	var npa = $('#npa option:selected').val();
	var bvm = $('#bvm').prop('checked');
	var rate = $('#airway_rate').val();
	var time = $('#airway_time').val();
	var timeToUse = Date.parse(time);
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO airway (patient, oxygen, basic_maneuvers, opa, npa, bvm, rate, time)' +
					' VALUES (?, ?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), oxygen, b_man, opa, npa, bvm, rate, timeToUse], 
					function(){	
						jQT.goBack();														
					},
					errorHandler
				);
			}
		);
	}
	else {  								/********** UPDATE *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE airway SET oxygen=?, basic_maneuvers=?, opa=?, npa=?, bvm=?, rate=?, time=? WHERE id=?;',
					[oxygen, b_man, opa, npa, bvm, rate, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}

/***********************************************************************************/
/* 						get Invasive Airway into fields matching patient id				*/
/***********************************************************************************/
function loadInvasiveAirway() {
	$('#invasive_airway_time').val(getFormatedDate(getSystemTime()));
	
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM invasive_airway WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#airway_secured').prop('checked', getBool(row.secured));
						$('#airway_device').val(row.device);
						$('#airway_distance').val(row.distance);
						$('#airway_size').val(row.size);
						$('#airway_cuffed').prop('checked', getBool(row.cuffed));
						$('#airway_cuff_inflation').val(row.inflation);
						$('#airway_bvm').prop('checked', getBool(row.bvm));
						$('#airway_attempts').val(row.attempts);
						$('#invasive_airway_time').val(getFormatedDate(row.time));
						setMobiscroll(row.time, '#invasive_airway_time');
					}
					reflectDB('#airway_cuffed','#div_cuff_inflation');
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save Invasive Airway into fields matching patient id				*/
/***********************************************************************************/
function saveInvasiveAirway() {
	var secured = $('#airway_secured').prop('checked');
	var device = $('#airway_device option:selected').val();
	var distance = $('#airway_distance').val();
	var size = $('#airway_size').val();
	var cuffed = $('#airway_cuffed').prop('checked');
	var inflation = $('#airway_cuff_inflation').val();
	var bvm = $('#airway_bvm').prop('checked');
	var attempts = $('#airway_attempts').val();
	var time = $('#invasive_airway_time').val();
	var timeToUse = Date.parse(time);
	
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE invasive_airway SET assessed=?, secured=?, device=?, distance=?, size=?, cuffed=?, inflation=?, bvm=?, attempts=?, time=? WHERE patient=?;',
				['true', secured, device, distance, size, cuffed, inflation, bvm, attempts, timeToUse, getCurrentPatientId()], 
				function(){	
					jQT.goBack();														
				},
				errorHandler
			);
		}
	);
}		 

/***********************************************************************************/
/* 							Load Ventilator List 								*/
/***********************************************************************************/
function loadVentilatorList() {
	loadRecordsList('#ventilator_sorted', 'ventilator', '#ventilatorTemplate', '.ventilator_time', '#vent');
}

/***********************************************************************************/
/* 						get Ventilator into fields matching patient id				*/
/***********************************************************************************/
function loadVentilator() {
	ClearAllFields();
	$('#ventilator_time').val(getFormatedDate(getSystemTime()));
	$('#ventilator_vented').prop('checked', false);
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM ventilator WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#ventilator_vented').prop('checked', getBool(row.vented));
							$('#ventilator_control').prop('checked', getBool(row.control));
							$('#ventilator_simv').prop('checked', getBool(row.mode));
							$('#ventilator_rate').val(row.rate);
							$('#ventilator_tidal_vol').val(row.tidal_v);
							$('#ventilator_insp_time').val(row.insp_time);
							$('#ventilator_i_ratio').val(row.i_ratio);
							$('#ventilator_e_ratio').val(row.e_ratio);
							$('#ventilator_fiO2').val(row.fiO2);
							$('#ventilator_peep').val(row.peep);
							$('#ventilator_sensitivity').val(row.sensitivity);
							$('#ventilator_expir_p').val(row.expir_p);
							$('#ventilator_expir_tidal_v').val(row.expir_tidal_v);
							$('#ventilator_max_inspir_p').val(row.max_insp_p);
							$('#ventilator_plateau_p').val(row.plateau_p);
							$('#ventilator_p_support').val(row.p_support);
							$('#ventilator_limit_p_high').val(row.high_p_lim);
							$('#ventilator_limit_p_low').val(row.low_p_lim);
							$('#ventilator_low_min_v').val(row.low_min_v);
							$('#ventilator_time').val(getFormatedDate(row.time));		
							setMobiscroll(row.time, '#ventilator_time');
						}
						reflectDB('#ventilator_vented', '#div_vented');
					}
				);
			}
		);
	}
}

/***********************************************************************************/
/* 						save Ventilator into fields matching patient id				*/
/***********************************************************************************/
function saveVentilator() {
	var vented = $('#ventilator_vented').prop('checked');
	var control = $('#ventilator_control').prop('checked');
	var mode = $('#ventilator_simv').prop('checked');
	var rate = $('#ventilator_rate').val();
	var tidal = $('#ventilator_tidal_vol').val();
	var insp_t = $('#ventilator_insp_time').val();
	var i = $('#ventilator_i_ratio').val();
	var e = $('#ventilator_e_ratio').val();
	var fiO2 = $('#ventilator_fiO2').val();
	var peep = $('#ventilator_peep').val();
	var sensit = $('#ventilator_sensitivity').val();
	var expir_p = $('#ventilator_expir_p').val();
	var exp_tidal_v = $('#ventilator_expir_tidal_v').val();
	var max_insp_p = $('#ventilator_max_inspir_p').val();
	var plateau_p = $('#ventilator_plateau_p').val();
	var p_support = $('#ventilator_p_support').val();
	var high_p_lim = $('#ventilator_limit_p_high').val();
	var low_p_lim = $('#ventilator_limit_p_low').val();
	var low_min_v = $('#ventilator_low_min_v').val();
	var time = $('#ventilator_time').val();
	var timeToUse = Date.parse(time);
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO ventilator (patient, vented, control, mode, rate, tidal_v, insp_time, i_ratio, e_ratio, fiO2, peep, ' +
					' sensitivity, expir_p, expir_tidal_v, max_insp_p, plateau_p, p_support, high_p_lim , low_p_lim , low_min_v, time)' +
					' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), vented, control, mode, rate, tidal, insp_t, i, e, fiO2, peep,sensit, expir_p,
					exp_tidal_v, max_insp_p, plateau_p, p_support, high_p_lim, low_p_lim, low_min_v, timeToUse], 
					function(){	
						jQT.goBack();														
					},
					errorHandler
				);
			}
		);
	}
	else {  								/********** UPDATE *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE ventilator SET vented=?, control=?, mode=?, rate=?, tidal_v=?, insp_time=?, i_ratio=?, e_ratio=?, fiO2=?, peep=?, ' +
					' sensitivity=?, expir_p=?, expir_tidal_v=?, max_insp_p=?, plateau_p=?, p_support=?, high_p_lim=?, low_p_lim=?, low_min_v=?, ' +
					' time=? WHERE id=?;',
					[vented, control, mode, rate, tidal, insp_t, i, e, fiO2, peep,sensit, expir_p,
					exp_tidal_v, max_insp_p, plateau_p, p_support, high_p_lim, low_p_lim, low_min_v, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}		

/***********************************************************************************/
/* 							Load CPAP/BiPAP List 								*/
/***********************************************************************************/
function loadCPAPBiPAPList() {
	loadRecordsList('#cpap_bipap_sorted', 'cpap_bipap', '#cpap_bipapTemplate', '.cpap_bipap_time', '#cpap_bipap');
}

/***********************************************************************************/
/* 						get CPAP/BiPAP into fields matching patient id				*/
/***********************************************************************************/
function loadCPAP_BiPAP() {
	ClearAllFields();
	$('#cpap_bipap_time').val(getFormatedDate(getSystemTime()));
	$('#cpap_device').prop('checked', false);
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM cpap_bipap WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#cpap_device').prop('checked', getBool(row.device));
							$('#cpap_bipap_size').val(row.size);
							$('#cpap_bipap_fiO2').val(row.fiO2);
							$('#cpap_bipap_peep').val(row.peep);
							$('#cpap_bipap_pressure').val(row.pressure);
							$('#cpap_bipap_time').val(getFormatedDate(row.time));
							setMobiscroll(row.time, '#cpap_bipap_time');
						}
					}
				);
			}
		);
	}
}

/***********************************************************************************/
/* 						save CPAP/BiPAP into fields matching patient id				*/
/***********************************************************************************/
function saveCPAP_BiPAP() {
	var device = $('#cpap_device').prop('checked');
	var size = $('#cpap_bipap_size').val();
	var fiO2 = $('#cpap_bipap_fiO2').val();
	var peep = $('#cpap_bipap_peep').val();
	var pressure = $('#cpap_bipap_pressure').val();
	var time = $('#cpap_bipap_time').val();
	var timeToUse = Date.parse(time);
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO cpap_bipap (patient, device, size, fiO2, peep, pressure, time)' +
					' VALUES (?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), device, size, fiO2, peep, pressure, timeToUse], 
					function(){	
						jQT.goBack();													
					},
					errorHandler
				);
			}
		);
	}
	else {  								/********** UPDATE *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE cpap_bipap SET device=?, size=?, fiO2=?, peep=?, pressure=?, time=? WHERE id=?;',
					[device, size, fiO2, peep, pressure, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}		 

/***********************************************************************************/
/* 							Load Suction List 								*/
/***********************************************************************************/
function loadSuctionList() {
	loadRecordsList('#suction_sorted', 'suction', '#suctionTemplate', '.suction_time', '#suction');
}

/***********************************************************************************/
/* 						get Suction into fields matching patient id				*/
/***********************************************************************************/
function loadSuction() {
	ClearAllFields();
	$('#suction_time').val(getFormatedDate(getSystemTime()));
	
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM suction WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#suction_suction').prop('checked', getBool(row.suction));
							$('#suction_duration').val(row.duration);
							$('#suction_amount').val(row.amount);
							$('#suction_tip').val(row.tip);
							$('#suction_size').val(row.size);
							$('#suction_time').val(getFormatedDate(row.time));
							setMobiscroll(row.time, '#suction_time');
						}
					}
				);
			}
		);
	}
}

/***********************************************************************************/
/* 						save Suction into fields matching patient id				*/
/***********************************************************************************/
function saveSuction() {
	var suction = $('#suction_suction').prop('checked');
	var duration = $('#suction_duration').val();
	var amount = $('#suction_amount').val();
	var tip = $('#suction_tip').val();
	var size = $('#suction_size').val();
	var time = $('#suction_time').val();
	var timeToUse = Date.parse(time);
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO suction (patient, suction, duration, amount, tip, size, time)' +
					' VALUES (?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), suction, duration, amount, tip, size, timeToUse], 
					function(){	
						jQT.goBack();														
					},
					errorHandler
				);
			}
		);
	}
	else {
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE suction SET suction=?, duration=?, amount=?, tip=?, size=?, time=? WHERE id=?;',
					[suction, duration, amount, tip, size, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}	

/***********************************************************************************/
/* 							Load IV / IO List 								*/
/***********************************************************************************/
function loadIV_IOList() {
	loadRecordsList('#iv_io_sorted', 'iv_io', '#iv_ioTemplate', '.iv_io_time', '#iv_io');
}

/***********************************************************************************/
/* 						get IV_IO into fields matching patient id				*/
/***********************************************************************************/
function loadIV_IO() {
	ClearAllFields();
	$('#iv_io_time').val(getFormatedDate(getSystemTime()));
	$('#li_fluid_related').hide();
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM iv_io WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#iv_io_site').val(row.site);
							$('#iv_io_site_side').prop('checked', getBool(row.side));
							$('#iv_io_gauge').val(row.gauge);
							$('#iv_io_attempts').val(row.attempts);
							$('#iv_io_success').prop('checked', getBool(row.successful));
							$('#iv_io_fluid').val(row.fluid);
							$('#fluid_other').val(row.fluid_other);
							$('#iv_io_time').val(getFormatedDate(row.time));
							setMobiscroll(row.time, '#iv_io_time');
						}
						reflect_select('#iv_io_fluid', 5, '#li_fluid_related');
					}
				);
			}
		);
	}
}

/***********************************************************************************/
/* 						save IV/IO into fields matching patient id				*/
/***********************************************************************************/
function saveIV_IO() {
	var site = $('#iv_io_site option:selected').val();
	var side = $('#iv_io_site_side').prop('checked');
	var gauge = $('#iv_io_gauge option:selected').val();
	var attempts = $('#iv_io_attempts').val();
	var success = $('#iv_io_success').prop('checked');
	var fluid = $('#iv_io_fluid').val();
	var fluid_other = $('#fluid_other').val();
	var time = $('#iv_io_time').val();
	var timeToUse = Date.parse(time);
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO iv_io (patient, site, side, gauge, attempts, successful, fluid, fluid_other, time)' +
					' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), site, side, gauge, attempts, success, fluid, fluid_other, timeToUse], 
					function(){	
						jQT.goBack();														
					},
					errorHandler
				);
			}
		);
	}
	else {
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE iv_io SET site=?, side=?, gauge=?, attempts=?, successful=?, fluid=?, fluid_other=?, time=? WHERE id=?;',
					[site, side, gauge, attempts, success, fluid, fluid_other, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}		 

/***********************************************************************************/
/* 							Load Splinting List 								*/
/***********************************************************************************/
function loadSplintingList() {
	loadRecordsList('#splinting_sorted', 'splinting', '#splintingTemplate', '.splinting_time', '#splinting');
}

/***********************************************************************************/
/* 						get Splinting into fields matching patient id				*/
/***********************************************************************************/
function loadSplinting() {
	ClearAllFields();
	$('#splinting_time').val(getFormatedDate(getSystemTime()));
	$('#li_splint_type_other').hide();
	$('#li_splint_position_other').hide();
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM splinting WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#splinting_location').val(row.location);
							$('#splinting_side').val(row.side);
							$('#splinting_prior').prop('checked', getBool(row.prior));
							$('#splinting_post').prop('checked', getBool(row.post));
							$('#traction_applied').prop('checked', getBool(row.traction));
							$('#type_splint').val(row.type);
							$('#type_splint_other').val(row.type_other);
							$('#splinting_position').val(row.position);
							$('#splinting_position_other').val(row.position_other);
							$('#splinting_time').val(getFormatedDate(row.time));		
							setMobiscroll(row.time, '#splinting_time');
						}
						reflect_select('#type_splint', 7, '#li_splint_type_other');
						reflect_select('#splinting_position', 3, '#li_splint_position_other');
					}
				);
			}
		);
	}
}

/***********************************************************************************/
/* 						save Splinting into fields matching patient id				*/
/***********************************************************************************/
function saveSplinting() {
	var location = $('#splinting_location option:selected').val();
	var side = $('#splinting_side').prop('checked');
	var prior = $('#splinting_prior').prop('checked');
	var post = $('#splinting_post').prop('checked');
	var traction = $('#traction_applied').prop('checked');
	var type = $('#type_splint option:selected').val();
	var type_other = $('#type_splint_other').val();
	var position = $('#splinting_position option:selected').val();
	var position_other = $('#splinting_position_other').val();
	var time = $('#splinting_time').val();
	var timeToUse = Date.parse(time);
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO splinting (patient, location, side, prior, post, traction, type, type_other, position, position_other, time)' +
					' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), location, side, prior, post, traction, type, type_other, position, position_other, timeToUse], 
					function(){	
						jQT.goBack();														
					},
					errorHandler
				);
			}
		);
	}
	else {
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE splinting SET location=?, side=?, prior=?, post=?, traction=?, type=?, type_other=?, position=?, ' +
					' position_other=?, time=? WHERE id=?;',
					[location, side, prior, post, traction, type, type_other, position, position_other, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}		 

/***********************************************************************************/
/* 							Load Medication List 								*/
/***********************************************************************************/
function loadMedicationList() {
	loadRecordsList('#medication_sorted', 'medication', '#medicationTemplate', '.medication_time', '#medication');
}

/***********************************************************************************/
/* 						get Medication into fields matching patient id				*/
/***********************************************************************************/
function loadMedication() {
	ClearAllFields();
	$('#medication_time').val(getFormatedDate(getSystemTime()));
	var medicValue = 0;
	$('#li_route_other_related').hide();
	$('#li_admin_other_related').hide();
	$('#li_medication_other').hide();
	$('#medication_name_generic').prop("checked", true);
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM medication WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);
							medicValue = row.medication;
							$('#medication_other').val(row.medic_other);
							$('#medication_dose').val(row.dose);
							$('#medication_dose_unit').val(row.dose_unit);
							$('#medication_route').val(row.route);
							$('#medication_route_other').val(row.route_other);
							$('#medication_indication').val(row.indication);
							$('#medication_admin_by').val(row.admin);
							$('#medication_admin_other').val(row.admin_other);
							$('#medication_same_dose').val(row.same_dose);
							$('#medication_time').val(getFormatedDate(row.time));
							setMobiscroll(row.time, '#medication_time');
						}
						reflect_select('#medication_route', 16, '#li_route_other_related');
						reflect_select('#medication_admin_by', 2, '#li_admin_other_related');
						//populate SELECT
						$('#medication_name_generic').prop('checked', true);
						loadSelectedMedication(medicValue);
					}
				);
			}
		);
	}
	loadSelectedMedication(0);
}

/***********************************************************************************/
/* 						Change Medication names			*/
/***********************************************************************************/
function loadSelectedMedication(pMedicValue){

	// By default: using generic table names
	var names = medication_generic_alpha;
	// And the default position is "Medication"
	var calculatedPos = 0;
	console.log("loading: "+ pMedicValue);
	if (pMedicValue != 0){
		// Check what kind of names is selected
		if ($('#medication_name_generic').prop('checked') == true){
			calculatedPos = parseInt(pMedicValue)+1;
		}
		else{
			names = medication_trade_alpha;
			calculatedPos = parseInt(convertToTradeNb(pMedicValue-1));
		}
	}
	// Empty the list
	$('#medication_medication').empty();
	$('#medication_medication').append('<option value="0">Other</option>');
	// Populate the list with apropriate names
	for (var i=0; i < names.length; i++) {
		var row = names[i];
		$('#medication_medication').append("<option value=" + (i+1) +">" + row + "</option>");
	}
	console.log("Position calculated "+ calculatedPos);
	// Put back the previously selected medication
	$('#medication_medication option:nth-child(' + calculatedPos + ')').prop("selected", "selected");
	reflect_select('#medication_medication', 0, '#li_medication_other');
}

/***********************************************************************************/
/* 						Switch Medication names			*/
/***********************************************************************************/
function switchSelectGeneric(){

	// Get the medic in the dropdown
	var currentMedic = $('#medication_medication').val();
	// Default names
	var names = medication_generic_alpha;
	var calculatedPos = 0;
	
	if (currentMedic != 0){
		// Check what kind of names is selected
		if ($('#medication_name_generic').prop('checked') == false){
			names = medication_generic_alpha;
			calculatedPos = parseInt(convertToGenericNb(currentMedic-1))+2;
		}
		else{
			names = medication_trade_alpha;
			calculatedPos = parseInt(convertToTradeNb(currentMedic-1))+2;
		}
	}
	// Empty the list
	$('#medication_medication').empty();
	$('#medication_medication').append('<option value="0">Other</option>');
	// Populate the list with apropriate names
	for (var i=0; i < names.length; i++) {
		var row = names[i];
		$('#medication_medication').append("<option value=" + (i+1) +">" + row + "</option>");
	}
	// Put back the previously selected medication
	$('#medication_medication option:nth-child(' + calculatedPos + ')').prop("selected", "selected");
}

/***********************************************************************************/
/* 						save Medication into fields matching patient id				*/
/***********************************************************************************/
function saveMedication() {
	var isGeneric = $('#medication_name_generic').prop('checked');
	var medication = $('#medication_medication option:selected').val();
	// Check what kind of names is selected
	console.log("Saving " + medication);
	if (medication != 0){
		if ($('#medication_name_generic').prop('checked') == false){
			medication = convertToGenericNb(medication-1)+1;
		}
	}
	console.log("Saving (after conversion) " + medication);
	var medic_other = $('#medication_other').val();
	var dose = $('#medication_dose').val();
	var dose_unit = $('#medication_dose_unit option:selected').val();
	var route = $('#medication_route option:selected').val();
	var route_other = $('#medication_route_other').val();
	var indication = $('#medication_indication').val();
	var admin = $('#medication_admin_by option:selected').val();
	var admin_other = $('#medication_admin_other').val();
	var same_dose = $('#medication_same_dose').val();
	var time = $('#medication_time').val();
	var timeToUse = Date.parse(time);
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO medication (patient, isGeneric, medication, medic_other, dose, dose_unit, route, route_other, indication, admin, admin_other, same_dose, time)' +
					' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), isGeneric, medication, medic_other, dose, dose_unit, route, route_other, indication, admin, admin_other, same_dose, timeToUse], 
					function(){	
						jQT.goBack();														
					},
					errorHandler
				);
			}
		);
	}
	else {
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE medication SET isGeneric=?, medication=?, medic_other=?, dose=?, dose_unit=?, route=?, route_other=?, indication=?, admin=?, ' +
					' admin_other=?, same_dose=?, time=? WHERE id=?;',
					[isGeneric, medication, medic_other, dose, dose_unit, route, route_other, indication, admin, admin_other, same_dose, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}		 

/***********************************************************************************/
/* 						get C-Spine into fields matching patient id				*/
/***********************************************************************************/
function loadCSpine() {
	$('#c_spine_time').val(getFormatedDate(getSystemTime()));
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM c_spine WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#manual_c_spine').prop('checked', getBool(row.manual));
						$('#c_collar').prop('checked', getBool(row.c_collar));
						$('#c_spine_size').val(row.size);
						$('#c_spine_back_board').val(row.backboard);
						$('#c_spine_transfer').val(row.transferred);
						$('#c_spine_Secured').val(row.secured);
						$('#c_spine_time').val(getFormatedDate(row.time));			
						setMobiscroll(row.time, '#c_spine_time');
					}
					reflectDB('#c_collar','#li_collar_related');
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save C-Spine into fields matching patient id				*/
/***********************************************************************************/
function saveCSpine() {
	var manual = $('#manual_c_spine').prop('checked');
	var c_collar = $('#c_collar').prop('checked');
	var size = $('#c_spine_size option:selected').val();
	var backboard = $('#c_spine_back_board option:selected').val();
	var transferred = $('#c_spine_transfer option:selected').val();
	var secured = $('#c_spine_Secured option:selected').val();
	var time = $('#c_spine_time').val();
	var timeToUse = Date.parse(time);
	
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE c_spine SET assessed=?, manual=?, c_collar=?, size=?, backboard=?, transferred=?, secured=?, time=? WHERE patient=?;',
				['true', manual, c_collar, size, backboard, transferred, secured, timeToUse, getCurrentPatientId()], 
				function(){	
					jQT.goBack();														
				},
				errorHandler
			);
		}
	);
}		 

/***********************************************************************************/
/* 							Load In Out List 								*/
/***********************************************************************************/
function loadInOutList() {
	loadRecordsList('#in_out_sorted', 'in_out', '#in_outTemplate', '.in_out_time', '#in_out');
}

/***********************************************************************************/
/* 						get In/Out into fields matching patient id				*/
/***********************************************************************************/
function loadInOut() {
	ClearAllFields();
	$('#in_out_time').val(getFormatedDate(getSystemTime()));
	$('#in_out_intake').prop("checked", "checked");
	$('#li_intake_other_related').hide();
	$('#li_outtake_other_related').hide();
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM in_out WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#intake_volume').val(row.intake_volume);
							$('#intake_substance').val(row.intake_substance);
							$('#intake_other').val(row.intake_other);
							$('#outtake_volume').val(row.outtake_volume);
							$('#outtake_substance').val(row.outtake_substance);	
							$('#outtake_other').val(row.outtake_other);	
							$('#in_out_time').val(getFormatedDate(row.time));
							setMobiscroll(row.time, '#in_out_time');
						}
						reflect_select('#intake_substance', 6, '#li_intake_other_related');
						reflect_select('#outtake_substance', 4, '#li_outtake_other_related');
					}
				);
			}
		);
	}
	$('#intakeDiv').css("display", "block");
	$('#outtakeDiv').css("display", "none");
}

/***********************************************************************************/
/* 						save In/Out into fields matching patient id				*/
/***********************************************************************************/
function saveInOut() {
	var in_volume = $('#intake_volume').val();
	var in_substance = $('#intake_substance option:selected').val();
	var in_other = $('#intake_other').val();
	var out_volume = $('#outtake_volume').val();
	var out_substance = $('#outtake_substance option:selected').val();
	var out_other = $('#outtake_other').val();
	var time = $('#in_out_time').val();
	var timeToUse = Date.parse(time);
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO in_out (patient, intake_volume, intake_substance, intake_other, outtake_volume, outtake_substance, outtake_other, time)' +
					' VALUES (?, ?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), in_volume, in_substance, in_other, out_volume, out_substance, out_other, timeToUse], 
					function(){	
						jQT.goBack();														
					},
					errorHandler
				);
			}
		);
	}
	else {
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE in_out SET intake_volume=?, intake_substance=?, intake_other=?, outtake_volume=?, outtake_substance=?, ' +
					' outtake_other=?, time=? WHERE id=?;',
					[in_volume, in_substance, in_other, out_volume, out_substance, out_other, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}		 

/***********************************************************************************/
/* 							Load ECG List 								*/
/***********************************************************************************/
function loadECGList() {
	loadRecordsList('#ecg_sorted', 'ecg', '#ecgTemplate', '.ecg_time', '#ecg');
}

/***********************************************************************************/
/* 						get ECG into fields matching patient id				*/
/***********************************************************************************/
function loadECG() {
	ClearAllFields();
	resetPicture('ecgImage');
	$('#ecg_time').val(getFormatedDate(getSystemTime()));
	
	$('#div_ST_related li').data('status', '');
	colorECGButtons();
	
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM ecg WHERE patient=? AND id = ?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#leads_nb').prop('checked', getBool(row.leads_nb));
							$('#rhythm').val(row.rhythm);
							$('#ecg_regular').prop('checked', getBool(row.regular));
							$('#bbb').prop('checked', getBool(row.bbb));
							$('#bbb_side').prop('checked', getBool(row.bbb_side));
							$('#st_changes').prop('checked', getBool(row.st_changes));
							$('#ecg_i').data('status', row.bi);
							$('#ecg_avr').data('status', row.bavr);
							$('#ecg_v1').data('status', row.bv1);
							$('#ecg_v4').data('status', row.bv4);
							$('#ecg_ii').data('status', row.bii);
							$('#ecg_avl').data('status', row.bavl);
							$('#ecg_v2').data('status', row.bv2);
							$('#ecg_v5').data('status', row.bv5);
							$('#ecg_iii').data('status', row.biii);
							$('#ecg_avf').data('status', row.bavf);
							$('#ecg_v3').data('status', row.bv3);
							$('#ecg_v6').data('status', row.bv6);
							$('#ecg_pacs').prop('checked', getBool(row.ecg_pacs));
							$('#ecg_pvcs').prop('checked', getBool(row.ecg_pvcs));
							$('#ecg_time').val(getFormatedDate(row.time));
							setMobiscroll(row.time, '#ecg_time');
							setPicture('ecgImage', row.photo);
							colorECGButtons();
						}
						reflectDB('#bbb', '#bbb_side');
						reflectDB('#st_changes', '#div_ST_related');
					}
				);
			}
		);
	}
	// Wait for PhoneGap to connect with the device
	//document.addEventListener("deviceready",onCameraReady,false);
}

/***********************************************************************************/
/* 						save ECG into fields matching patient id				*/
/***********************************************************************************/
function saveECG() {
	var leads_nb = $('#leads_nb').prop('checked');
	var rhythm = $('#rhythm option:selected').val();
	var regular = $('#ecg_regular').prop('checked');
	var bbb = $('#bbb').prop('checked');
	var bbb_side = $('#bbb_side').prop('checked');
	var st_changes = $('#st_changes').prop('checked');
	var bi = $('#ecg_i').data('status');
	var bavr = $('#ecg_avr').data('status');
	var bv1 = $('#ecg_v1').data('status');
	var bv4 = $('#ecg_v4').data('status');
	var bii = $('#ecg_ii').data('status');
	var bavl = $('#ecg_avl').data('status');
	var bv2 = $('#ecg_v2').data('status');
	var bv5 = $('#ecg_v5').data('status');
	var biii = $('#ecg_iii').data('status');
	var bavf = $('#ecg_avf').data('status');
	var bv3 = $('#ecg_v3').data('status');
	var bv6 = $('#ecg_v6').data('status');
	var ecg_pacs = $('#ecg_pacs').prop('checked');
	var ecg_pvcs = $('#ecg_pvcs').prop('checked');
	var time = $('#ecg_time').val();
	var timeToUse = Date.parse(time);
	var photo = document.getElementById('ecgImage').src;
	if (photo.substr(0,4) != "data") photo = '';
	
	if (getCurrentRecord() == '0'){   			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO ecg (patient, leads_nb, rhythm, regular, bbb, bbb_side, st_changes, bi, bii, biii, ' +
					' bavr, bavl, bavf, bv1, bv2, bv3, bv4, bv5, bv6, ecg_pacs, ecg_pvcs, photo, time) ' +
					' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
					[getCurrentPatientId(), leads_nb, rhythm, regular, bbb, bbb_side, st_changes, bi, bii, biii, bavr, bavl, bavf,
					bv1, bv2, bv3, bv4, bv5, bv6, ecg_pacs, ecg_pvcs, photo, timeToUse],       
					function(){	
						jQT.goBack();														
					},
					errorHandler
				);
			}
		);
	}
	else {
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE ecg SET leads_nb=?, rhythm=?, regular=?, bbb=?, bbb_side=?, st_changes=?, bi=?, bii=?, biii=?, ' +
					' bavr=?, bavl=?, bavf=?, bv1=?, bv2=?, bv3=?, bv4=?, bv5=?, bv6=?, ecg_pacs=?, ecg_pvcs=?, photo=?, time=? WHERE id=?;',
					[leads_nb, rhythm, regular, bbb, bbb_side, st_changes, bi, bii, biii, bavr, bavl, bavf,
					bv1, bv2, bv3, bv4, bv5, bv6, ecg_pacs, ecg_pvcs, photo, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}		 

/***********************************************************************************/
/* 						get signatures												*/
/***********************************************************************************/
function loadSignatures() {
	
	// Show the widget menu
	showPatientPageWidget();
	
	// clearing canvas
	clearAllCanvas();
	
	// Reset the signaturePaths
	practitionerSignaturePath = '';
	patientSignaturePath = '';
	hospReprSignaturePath = '';
	witnessSignaturePath = '';
	
	// ability to sign by the patient
	$('#unableToSign').prop("checked", false);
	
	// get canvas from HTML
	practitionerCanvas = document.getElementById('sigCanvasPractitioner');
	patientCanvas = document.getElementById('sigCanvasPatient');
	hospReprCanvas = document.getElementById('sigCanvasHospRepr');
	witnessCanvas = document.getElementById('sigCanvasWitness');
	
	// The pencil tool instance.
	tool = new tool_pencil();
	
	// get the signatures from db
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM signatures WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#sigPractitionerName').val(row.sigPractitionerText);
						$('#sigPatientName').val(row.sigPatientText);
						$('#unableToSign').prop('checked', getBool(row.noSign));
						$('#unableToSignReason').val(row.reason);
						$('#sigHospReprName').val(row.sigHospReprText);
						$('#sigWitnessName').val(row.sigWitnessText);
						practitionerSignaturePath = row.sigPractitioner;
						patientSignaturePath = row.sigPatient;
						hospReprSignaturePath = row.sigHospRepr;
						witnessSignaturePath = row.sigWitness;
						//$('#signatures_time').val(row.time);						
					}
					// Regenerating Signatures
					regenerateSig(patientCanvas, patientSignaturePath);
					regenerateSig(hospReprCanvas, hospReprSignaturePath);
					regenerateSig(witnessCanvas, witnessSignaturePath);
					regenerateSig(practitionerCanvas, practitionerSignaturePath);
					// toggle ability to sign
					if ($('#unableToSign').prop("checked") == true){
						$('#li_signReason').show();
					}
					else{
						$('#li_signReason').hide();
					}
				}
			);
		}
	);
	
	// set the current canvas as practitioner
	currentSig = 'practitioner';
	SignatureToggle(currentSig);
}

/***********************************************************************************/
/* 						Toggle signatures												*/
/***********************************************************************************/
function SignatureToggle(link){

	// Reset the signaturePath
	signaturePath = '';

	// Reset all the shortcut css
	$('#signaturebar input[type="radio"]').prop("checked", "");
	if (link == 'practitioner') {
		currentSig = 'practitioner';
		$('#sig_practitioner_ul').css("display","block");
		$('#sig_patient_ul').css("display","none");
		$('#sig_HospRepr_ul').css("display","none");
		$('#sig_witness_ul').css("display","none");
		$('#sig_practitioner_link').prop("checked", "checked");
		practitionerCanvas = document.getElementById('sigCanvasPractitioner');
		context = practitionerCanvas.getContext('2d');
		addCanvasEvents(practitionerCanvas);
	}
	if (link == 'patient') {
		currentSig = 'patient';
		$('#sig_practitioner_ul').css("display","none");
		$('#sig_patient_ul').css("display","block");
		$('#sig_HospRepr_ul').css("display","none");
		$('#sig_witness_ul').css("display","none");
		$('#sig_patient_link').prop("checked", "checked");
		patientCanvas = document.getElementById('sigCanvasPatient');
		context = patientCanvas.getContext('2d');
		addCanvasEvents(patientCanvas);
	}
	if (link == 'hospRepr') {
		currentSig = 'hospRepr';
		$('#sig_practitioner_ul').css("display","none");
		$('#sig_patient_ul').css("display","none");
		$('#sig_HospRepr_ul').css("display","block");
		$('#sig_witness_ul').css("display","none");
		$('#sig_HospRepr_link').prop("checked", "checked");
		hospReprCanvas = document.getElementById('sigCanvasHospRepr');
		context = hospReprCanvas.getContext('2d');
		addCanvasEvents(hospReprCanvas);
	}
	if (link == 'witness') {
		currentSig = 'witness';
		$('#sig_practitioner_ul').css("display","none");
		$('#sig_patient_ul').css("display","none");
		$('#sig_HospRepr_ul').css("display","none");
		$('#sig_witness_ul').css("display","block");
		$('#sig_witness_link').prop("checked", "checked");
		witnessCanvas = document.getElementById('sigCanvasWitness');
		context = witnessCanvas.getContext('2d');
		addCanvasEvents(witnessCanvas);
	}
	window.scrollTo(0,0);
}

/***********************************************************************************/
/* 						save signatures											*/
/***********************************************************************************/
function saveSignatures(link) {
	// Format the signaturePath for each signatures so that they are usable by JSON
	formatSigPath();
	// get the text values
	var prac = $('#sigPractitionerName').val();
	var patient = $('#sigPatientName').val();
	var noSign = $('#unableToSign').prop('checked');
	var reason = $('#unableToSignReason').val();
	var h_r = $('#sigHospReprName').val();
	var witness = $('#sigWitnessName').val();
	// Save in db
	// UPDATE
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE signatures SET assessed=?, sigPractitionerText = ? , sigPatientText = ? , noSign = ? , reason = ? , ' + 
				'sigHospReprText = ? , sigWitnessText = ?, ' +
				'sigPractitioner = ?, sigPatient = ?, sigHospRepr = ?, sigWitness = ?, time=? ' +
				' WHERE patient = ? ;',
				['true', prac, patient, noSign, reason, h_r, witness, practitionerSignaturePath, patientSignaturePath,
				hospReprSignaturePath, witnessSignaturePath, getSystemTime(), getCurrentPatientId()],   
				function(){
					if (link == '#no_transport')
						jQT.goTo(link, 'flip');
					else
						jQT.goBack();
				},
				errorHandler
			);
		}
	);		
}

/***********************************************************************************/
/* 						format signatures									*/
/***********************************************************************************/
function formatSigPath(){
	practitionerSignaturePath = formatSig(practitionerSignaturePath);
	patientSignaturePath = formatSig(patientSignaturePath);
	hospReprSignaturePath = formatSig(hospReprSignaturePath);
	witnessSignaturePath = formatSig(witnessSignaturePath);
}

/***********************************************************************************/
/* 						formating each signature									*/
/***********************************************************************************/
function formatSig(sig){
	var begin = sig.slice(0, 6);
	if (begin == '{"lx":'){
		var len = sig.length;
		var ending = sig.slice(len -1, len);
		if (ending == ',')
			sig = sig.slice(0, -1);
		sig = '[' + sig + ']';
	}
	return sig;
}

/***********************************************************************************/
/* 						addCanvasEvents										*/
/***********************************************************************************/
function addCanvasEvents(pCanvas){
	var isTouch = ('ontouchstart' in window),
	// Event sniffing
	START_EVENT = isTouch ? 'touchstart' : 'mousedown',
	MOVE_EVENT = isTouch ? 'touchmove': 'mousemove',
	END_EVENT = isTouch ? 'touchend' : 'mouseup',
	CANCEL_EVENT = isTouch ? 'touchcancel' : 'mouseup';
	
  	// Attach the mousedown, mousemove and mouseup event listeners to a canvas
	pCanvas.addEventListener(START_EVENT, ev_canvas, false);
	pCanvas.addEventListener(MOVE_EVENT, ev_canvas, false);
	pCanvas.addEventListener(END_EVENT, ev_canvas, false);
}

/***********************************************************************************/
/* 		this painting tool works like a drawing pencil which tracks the mouse movements.	*/
/***********************************************************************************/

function tool_pencil (ev) {
	var tool = this;
	this.started = false;
	last_x = -1;
	last_y = -1;
	
	var mouseX, mouseY;

	// This is called when you start holding down the mouse button.
	// This starts the pencil drawing.
	this.mousedown = function (ev) {
		context.beginPath();
		context.moveTo(ev._x, ev._y);
		tool.started = true;
	};
	this.touchstart = function (ev) {
		if (isIpad())
			mouseX = ev.touches[0].clientX - 343;
		else
			mouseX = ev.touches[0].clientX - 23;
		mouseY = ev.touches[0].clientY - 163;
		context.beginPath();
		context.moveTo(mouseX, mouseY);
		tool.started = true;
	};

	// This function is called every time you move the mouse. Obviously, it only 
	// draws if the tool.started state is set to true (when you are holding down 
	// the mouse button).
	this.mousemove = function (ev) {
		if (tool.started) {
			context.lineTo(ev._x, ev._y);
			context.strokeStyle = "#339";
			context.stroke();
			if (last_x == "-1"){
				last_x = ev._x;
				last_y = ev._y;
			}
			signaturePath += '{"lx":' + last_x + ',"ly":' + last_y + ',"mx":' + ev._x + ',"my":' + ev._y + '},';
			//p.setAttribute('d', signaturePath);
			last_x = ev._x;
			last_y = ev._y;
		}
	};
    this.touchmove = function (ev) {
		if (isIpad())
			mouseX = ev.touches[0].clientX - 343;
		else
			mouseX = ev.touches[0].clientX - 23;
		mouseY = ev.touches[0].clientY - 163;
		if (tool.started) {
			context.lineTo(mouseX, mouseY);
			context.strokeStyle = "#339";
			context.stroke();
			if (last_x == "-1"){
				last_x = mouseX;
				last_y = mouseY;
			}
			signaturePath += '{"lx":' + last_x + ',"ly":' + last_y + ',"mx":' + mouseX + ',"my":' + mouseY + '},';
			//p.setAttribute('d', signaturePath);
			last_x = mouseX;
			last_y = mouseY;
		}
	};

	// This is called when you release the mouse button.
	this.mouseup = function (ev) {
		if (tool.started) {
			tool.mousemove(ev);
			tool.started = false;
			last_x = -1;
			last_y = -1;
		}
		// Fill the appropriate signature
		if (currentSig == 'practitioner'){
			practitionerSignaturePath = signaturePath;
		}
		if (currentSig == 'patient'){
			patientSignaturePath = signaturePath;
		}
		if (currentSig == 'hospRepr'){
			hospReprSignaturePath = signaturePath;
		}
		if (currentSig == 'witness'){
			witnessSignaturePath = signaturePath;
		}
	};
	this.touchend = function (ev) {
		if (tool.started) {
			tool.started = false;
			last_x = -1;
			last_y = -1;
		}
		// Fill the appropriate signature
		if (currentSig == 'practitioner'){
			practitionerSignaturePath = signaturePath;
		}
		if (currentSig == 'patient'){
			patientSignaturePath = signaturePath;
		}
		if (currentSig == 'hospRepr'){
			hospReprSignaturePath = signaturePath;
		}
		if (currentSig == 'witness'){
			witnessSignaturePath = signaturePath;
		}
	};
}

function ev_canvas (ev) {
	if (ev.layerX || ev.layerX == 0) { // Firefox
		ev._x = ev.layerX;
		ev._y = ev.layerY;
	} 
	else if (ev.offsetX || ev.offsetX == 0) { // Opera
		ev._x = ev.offsetX;
		ev._y = ev.offsetY;
	}

	// Call the event handler of the tool.
	var func = tool[ev.type];
	if (func) {
		func(ev);
	}
}

/***********************************************************************************/
/* 					 Regenerate Signature									*/
/***********************************************************************************/
function regenerateSig(canv, sig){
	// test if sign exists
	var begin = sig.slice(0, 7);
	if (begin == '[{"lx":'){
		// Set the context for the right canvas
		context = canv.getContext('2d');
		// convert from String to array
		var sigArray = [];
		sigArray = JSON.parse(sig);
		// draw the signature
		for(var e in sigArray){
			context.beginPath();
			context.moveTo(sigArray[e].mx,sigArray[e].my);
			context.lineTo(sigArray[e].lx,sigArray[e].ly);
			context.strokeStyle = "#339";
			context.stroke();
		}
	}
}

/***********************************************************************************/
/* 							 Clear a canvas									*/
/***********************************************************************************/
function clearCanvas(){
	signaturePath = '';
	context.clearRect(0,0,canvasWidth, canvasHeight);
}

function clearSingleCanvas(){
	// Erase the appropriate signature
	if (currentSig == 'practitioner'){
		practitionerCanvas = document.getElementById('sigCanvasPractitioner');
		context = practitionerCanvas.getContext('2d');
		practitionerSignaturePath = '';
	}
	if (currentSig == 'patient'){
		patientCanvas = document.getElementById('sigCanvasPatient');
		context = patientCanvas.getContext('2d');
		patientSignaturePath = '';
	}
	if (currentSig == 'hospRepr'){
		hospReprCanvas = document.getElementById('sigCanvasHospRepr');
		context = hospReprCanvas.getContext('2d');
		hospReprSignaturePath = '';
	}
	if (currentSig == 'witness'){
		witnessCanvas = document.getElementById('sigCanvasWitness');
		context = witnessCanvas.getContext('2d');
		witnessSignaturePath = '';
	}
	context.clearRect(0,0,canvasWidth, canvasHeight);
}

function clearAllCanvas(){
	practitionerCanvas = document.getElementById('sigCanvasPractitioner');
	context = practitionerCanvas.getContext('2d');
	clearCanvas();
	patientCanvas = document.getElementById('sigCanvasPatient');
	context = patientCanvas.getContext('2d');
	clearCanvas();
	hospReprCanvas = document.getElementById('sigCanvasHospRepr');
	context = hospReprCanvas.getContext('2d');
	clearCanvas();
	witnessCanvas = document.getElementById('sigCanvasWitness');
	context = witnessCanvas.getContext('2d');
	clearCanvas();
	SignatureToggle('practitioner');
}

/***********************************************************************************/
/* 						Populate Attendants												*/
/***********************************************************************************/
function populateAttendants(){
	//Start by clearing the list
	$('#call_info_attendant1').empty();
	$('#call_info_attendant2').empty();
	$('#call_info_driver').empty();
	//fill the list
	$('#call_info_attendant1').append("<option value='0'>" + localStorage.employee_first_name + " " + localStorage.employee_last_name + "</option>");
	$('#call_info_attendant2').append("<option value='0'>" + localStorage.employee_first_name + " " + localStorage.employee_last_name + "</option>");
	$('#call_info_driver').append("<option value='0'>" + localStorage.employee_first_name + " " + localStorage.employee_last_name + "</option>");
	$('#call_info_attendant1').append("<option value='1'>Other</option>");
	$('#call_info_attendant2').append("<option value='1'>Other</option>");
	$('#call_info_driver').append("<option value='1'>Other</option>");
	
	var partnersArray = [];
	partnersArray = (localStorage.frequent_partners).split(",");
	
	for (var i=0; i < partnersArray.length; i++) {
		$('#call_info_attendant1').append("<option value='" + parseInt(i+2) + "'>" + partnersArray[i] + "</option>");
		$('#call_info_attendant2').append("<option value='" + parseInt(i+2) + "'>" + partnersArray[i] + "</option>");
		$('#call_info_driver').append("<option value='" + parseInt(i+2) + "'>" + partnersArray[i] + "</option>");
	}
	$('#call_info_attendant1').val('0');
	$('#call_info_attendant2').val('0');
	$('#call_info_driver').val('0');
}

/***********************************************************************************/
/* 						get call info												*/
/***********************************************************************************/
function loadCallInfo() {
	
	// Show the widget menu
	showPatientPageWidget();
	
	// init buttons status
	$('#ppeButtons li').data('status', 'negative');
	$('#li_attendant1_other').hide();
	$('#li_attendant2_other').hide();
	$('#li_driver_other').hide();
	$('#li_assistance_related').hide();
	
	// Populate attendants
	populateAttendants();
	
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM call_info WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);								
						$('#call_info_attendant1').val(row.attendant1);
						$('#call_info_attendant1_other').val(row.attendant1_other);
						$('#call_info_attendant2').val(row.attendant2);
						$('#call_info_attendant2_other').val(row.attendant2_other);
						$('#call_info_driver').val(row.driver);
						$('#call_info_driver_other').val(row.driver_other);
						$('#call_info_unit_nb').val(row.unit_nb);
						$('#call_info_run_nb').val(row.run_nb);
						$('#call_info_respond_to').val(row.respond);
						$('#call_info_milage_start').val(row.milage_start);
						$('#call_info_milage_end').val(row.milage_end);
						$('#call_info_code_route').val(row.code_en_route);
						$('#call_info_code_return').val(row.code_return);
						$('#call_info_transported_to').val(row.transported_to);
						$('#call_info_transport_position').val(row.transported_position);
						// Times
						$('#call_info_time_notified').val(getFormatedDate(row.time_notified));
						$('#call_info_time_route').val(getFormatedDate(row.time_route));
						$('#call_info_time_on_scene').val(getFormatedDate(row.time_on_scene));
						$('#call_info_time_depart_scene').val(getFormatedDate(row.time_depart));
						$('#call_info_time_destination').val(getFormatedDate(row.time_destination));
						$('#call_info_time_transfer').val(getFormatedDate(row.time_transfer));
						$('#call_info_time_back_service').val(getFormatedDate(row.time_back_service));
						$('#call_info_time_patient_contact').val(getFormatedDate(row.time_patient_contact));
		
						// buttons
						$('#ppe_gloves').data('status', row.ppe_gloves);
						$('#ppe_eye_protection').data('status', row.ppe_eyes);
						$('#ppe_reflective_gear').data('status', row.ppe_reflective);
						$('#ppe_isolation_gear').data('status', row.ppe_isolation);
						$('#ppe_mask').data('status', row.ppe_mask);
								   
						$('#call_info_det1').val(row.det1);
						$('#call_info_det2').val(row.det2);
						$('#call_info_det3').val(row.det3);
						$('#call_info_assistance').val(row.assistance);
						$('#assistance_other').val(row.other);						
					}
					// ReflectDB on select
					reflect_select('#call_info_attendant1', 1, '#li_attendant1_other');
					reflect_select('#call_info_attendant2', 1, '#li_attendant2_other');
					reflect_select('#call_info_driver', 1, '#li_driver_other');
					reflect_select('#call_info_assistance', 3, '#li_assistance_related');
					// set the css and data property for each button
					$('#ppeButtons li').each(function(index) {
						if (($(this).data('status') == 'negative')){
							$(this).prop('class', '');
						}
						else {
							$(this).prop('class', 'twoTap');
						}
					}
					);
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save call info											*/
/***********************************************************************************/
function saveCallInfo() {
	var att1 = $('#call_info_attendant1').val();
	var att1_other = $('#call_info_attendant1_other').val();
	var att2 = $('#call_info_attendant2').val();
	var att2_other = $('#call_info_attendant2_other').val();
	var driver = $('#call_info_driver').val();
	var driver_other = $('#call_info_driver_other').val();
	var unit = $('#call_info_unit_nb').val();
	var run = $('#call_info_run_nb').val();
	var respond = $('#call_info_respond_to').val();
	var milage_st = $('#call_info_milage_start').val();
	var milage_end = $('#call_info_milage_end').val();
	var code_route = $('#call_info_code_route').val();
	var code_return = $('#call_info_code_return').val();
	var trans_to = $('#call_info_transported_to').val();
	var trans_pos = $('#call_info_transport_position').val();
	var time_notif = Date.parse($('#call_info_time_notified').val());
	var time_route = Date.parse($('#call_info_time_route').val());
	var time_scene = Date.parse($('#call_info_time_on_scene').val());
	var time_dep_sc = Date.parse($('#call_info_time_depart_scene').val());
	var time_dest = Date.parse($('#call_info_time_destination').val());
	var time_transf = Date.parse($('#call_info_time_transfer').val());
	var time_back = Date.parse($('#call_info_time_back_service').val());
	var time_contact = Date.parse($('#call_info_time_patient_contact').val());
	var ppe_gloves = $('#ppe_gloves').data('status');
	var ppe_eyes = $('#ppe_eye_protection').data('status');
	var ppe_reflect = $('#ppe_reflective_gear').data('status');
	var ppe_isolat = $('#ppe_isolation_gear').data('status');
	var ppe_mask = $('#ppe_mask').data('status');
	var det1 = $('#call_info_det1').val();
	var det2= $('#call_info_det2').val();
	var det3 = $('#call_info_det3').val();
	var assist = $('#call_info_assistance').val();	
	var other = $('#assistance_other').val();
	
	var partnersArray = [];
	partnersArray = (localStorage.frequent_partners).split(",");
	
	if ((att1 != "0") && (att1 != "1")){
		att1_other = partnersArray[parseInt(att1) - 2];
		att1 = "1";
	}
	if ((att2 != "0") && (att2 != "1")){
		att2_other = partnersArray[parseInt(att2) - 2];
		att2 = "1";
	}
	if ((driver != "0") && (driver != "1")){
		driver_other = partnersArray[parseInt(driver) - 2];
		driver = "1";
	}
	
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE call_info SET assessed=?, attendant1=?, attendant1_other=?, attendant2=?, attendant2_other=?, driver=?, driver_other=?, unit_nb=?, ' +
				' run_nb=?, respond=?, milage_start=?, milage_end=?, ' +
				' code_en_route=?, code_return=?, transported_to=?, transported_position=?, time_notified=?, time_route=?, time_on_scene=?, ' +
				' time_depart=?, time_destination=?, time_transfer=?, time_back_service=?, time_patient_contact=?, ppe_gloves=?, ppe_eyes=?, ppe_reflective=?, ' +
				' ppe_isolation=?, ppe_mask=?, det1=?, det2=?, det3=?, assistance=?, other=?, time=? WHERE patient=?;', 
				['true', att1, att1_other, att2, att2_other, driver, driver_other, unit, run, respond, milage_st, milage_end, code_route, code_return,
				trans_to, trans_pos, time_notif, time_route, time_scene, time_dep_sc, time_dest, time_transf, time_back, time_contact, ppe_gloves, 
				ppe_eyes, ppe_reflect, ppe_isolat, ppe_mask, det1, det2, det3, assist, other, getSystemTime(), getCurrentPatientId()],     
				function(){	
					jQT.goBack();														
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 						load No Transport into fields matching patient id				*/
/***********************************************************************************/
function loadNoTransport() {
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM no_transport WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);				
						$('#transport_mentally_capable').prop('checked', getBool(row.mentally_capable));
						$('#transport_should_be').prop('checked', getBool(row.should_trans));
						$('#transport_informed').prop('checked', getBool(row.informed));
						$('#transport_reason_refusal').val(row.reason);
						$('#reason_other').val(row.reason_other);
						$('#transport_left_with').val(row.left_with);
						$('#left_with_other').val(row.left_with_other);
						$('#transport_consult_with').val(row.consult_with);
					}
					reflect_select('#transport_reason_refusal', 5, '#li_reason_related');
					reflect_select('#transport_left_with', 7, '#li_left_with_related');
				}
			);
		}
	);
}

/***********************************************************************************/
/* 						save No Transport into fields matching patient id				*/
/***********************************************************************************/
function saveNoTransport() {
	var mentally = $('#transport_mentally_capable').prop('checked');
	var should = $('#transport_should_be').prop('checked');
	var informed = $('#transport_informed').prop('checked');
	var reason = $('#transport_reason_refusal').val();
	var r_other = $('#reason_other').val();
	var left = $('#transport_left_with').val();
	var lw_other = $('#left_with_other').val();
	var consult = $('#transport_consult_with').val();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'UPDATE no_transport SET assessed=?, mentally_capable=?, should_trans=?, informed=?, reason=?, reason_other=?, ' +
				'left_with=?, left_with_other=?, consult_with=?, time=? WHERE patient=?;',
				['true', mentally, should, informed, reason, r_other, left, lw_other, consult, getSystemTime(), getCurrentPatientId()],   
				function(){	
					jQT.goBack();														
				},
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 							Load Narrative List 								*/
/***********************************************************************************/
function loadNarrativeList() {
	loadRecordsList('#narrative_sorted', 'narrative', '#narrativeTemplate', '.narrative_time', '#narrative');
}

/***********************************************************************************/
/* 						get Narrative into fields matching patient id				*/
/***********************************************************************************/
function loadNarrative() {
	ClearAllFields();
	$('#narrative_time').val(getFormatedDate(getSystemTime()));
	if (getCurrentRecord() != '0'){
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM narrative WHERE patient=? AND id=?',
					[getCurrentPatientId(), getCurrentRecord()],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);				
							$('#narrative_text').val(row.narration);
							$('#narrative_time').val(getFormatedDate(row.time));
							//setMobiscroll(row.time, '#narrative_time');
						}
					}
				);
			}
		);
	}
}

/***********************************************************************************/
/* 						save Narrative into fields matching patient id				*/
/***********************************************************************************/
function saveNarrative() {
	var narration = $('#narrative_text').val();
	var time = $('#narrative_time').val();
	var timeToUse = Date.parse(time);
	if (getCurrentRecord() == '0'){			/******* INSERT INTO *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO narrative (patient, narration, time) ' +
					' VALUES (?, ?, ?);', 
					[getCurrentPatientId(), narration, timeToUse],   
					function(){	
						jQT.goBack();														
					},
					errorHandler
				);
			}
		);
	}
	else{										/********** UPDATE *******/
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'UPDATE narrative SET narration = ?, time=? WHERE id = ? ;',
					[narration, timeToUse, getCurrentRecord()], 
					function(){
						jQT.goBack();
					},
					errorHandler
				);
			}
		);
	}
}

/***********************************************************************************/
/* 								process export									*/
/***********************************************************************************/
function processExport() {
	jQT.goTo("#export_page");
}

/***********************************************************************************/
/* 								write Export Page									*/
/***********************************************************************************/
function writeExportMessage() {
	$('body').append('<div id="progress">Generating Patient Care Report...</div>');
}
function writeExportPage() {
	setTimeout("writeLoadedExportPage()",1500);
}

/***********************************************************************************/
/* 								Loaded Export Page									*/
/***********************************************************************************/
function writeLoadedExportPage() {
	
	// Chose full or short report
	var full_report = false;
	if ($(export_full).prop("checked") == true)
		full_report = true;
	
	// Select what to display
	customizeExport();
	var male = "true";
	$('#patient_info_sum').html("");
	$('#reporter_sum').html("");
	$('#reporter_sum').append(
		"<img style='width:80px; height:80px; float:left; margin-right:5px;' src='" + localStorage.photoID + "'>" +
		"<strong>" + getFormatedDate(getSystemTime()) + "<br />Report by " + localStorage.employee_first_name + " " + localStorage.employee_last_name + " (" +
		localStorage.employee_id + ") " + $('#employee_position option[value=' + localStorage.employee_position + ']').text() +
		" in " + localStorage.employee_location + "<strong><br /><br /><br /><br /><hr>"
	);
	
	var table_vitals="";
	var apg1="";
	var apg5="";
	var export_neuro="";
	var export_abc="";
	var export_trauma="";
	var export_auto_trauma="";
	var export_penetrating_trauma="";
	var export_blunt_trauma="";
	var export_fall_trauma="";
	var export_burn_trauma="";
	var export_gi_gu="";
	var export_field_delivery="";
	var export_muscular="";
	var table_airway="", export_airway="";
	var export_invasive="";
	var table_vent="", export_vent="";
	var table_cpap="", export_cpap="";
	var table_suction="", export_suction="";
	var table_ivio="", export_ivio="";
	var table_splinting="", export_splinting="";	
	var table_medication="", export_medication="";
	var export_c_spine="";
	var table_io="", export_io="";
	var table_ecg="", export_ecg="";
	var table_narrative="";
	var table_code="";
	
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM patients WHERE id=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						formatedDate = new Date;
						formatedDate.setTime(row.date_of_birth);
						if (row.gender == "false") male = "false";
						var conv ="";
						if (row.weight_unit == "false")
							conv = "lb (" + (parseFloat(row.weight) / 2.2).toFixed(1) + "Kg)";
						else
							conv = "Kg (" + (parseFloat(row.weight) * 2.2).toFixed(1) + "lb)";
						$('#patient_info_sum').append(						
							"<strong><u>Patient info</u></strong>&nbsp;<a href='#patient_info'>modifiy</a><br />" +	
							"<table><tbody>" +
							"<tr><td class='question'>Last name: </td><td class='answer'>" + row.last_name + "</td></tr>" +
							"<tr><td class='question'>First name: </td><td class='answer'>" + row.first_name + "</td></tr>" +
							"<tr><td class='question'>Date of Birth: </td><td class='answer'>" + formatedDate.toDateString() + "</td></tr>" +
							"<tr><td class='question'>Gender: </td><td class='answer'>" + boolToChoice(row.gender, "Male", "Female") + "</td></tr>" +
							"<tr><td class='question'>Weight : </td><td class='answer'>" + row.weight + conv +"</td></tr>" +
							"<tr><td class='question'>Street: </td><td class='answer'>" + row.street + "</td></tr>" +
							"<tr><td class='question'>City: </td><td class='answer'>" + row.city + "</td></tr>" +
							"<tr><td class='question'>Province: </td><td class='answer'>" + row.province + "</td></tr>" +
							"<tr><td class='question'>Home Phone: </td><td class='answer'>" + row.phone_home + "</td></tr>" +
							"<tr><td class='question'>Work Phone: </td><td class='answer'>" + row.phone_work + "</td></tr>" +
							"<tr><td class='question'>Cell Phone: </td><td class='answer'>" + row.phone_cell + "</td></tr>" +
							"<tr><td class='question'>Message Phone: </td><td class='answer'>" + row.phone_message + "</td></tr>" +
							"<tr><td class='question'>Insurance: </td><td class='answer'>" + row.insurance + "</td></tr>" +
							"<tr><td class='question'>MRN: </td><td class='answer'>" + row.mrn + "</td></tr>" +
							"<tr><td class='question'>Next of Kin: </td><td class='answer'>" + row.next_of_kin + "</td></tr>" +
							"<tr><td class='question'>Next of Kin Phone: </td><td class='answer'>" + row.nok_phone + "</td></tr>" +
							"<tr><td class='question'>Patient </td><td class='answer'>" + row.pt_number +
							" of " + row.of_number + "</td></tr>" +
							"</tbody></table><br /><hr>"
						);		
					}
				}
			);
		}
	);
	$('#vitals_sum').html("");
	table_vitals = 	"<strong><u>Vitals Records</u></strong>&nbsp;<a href='#vitals_list'>modifiy</a><br />" +
						"<table>" +
						"<tbody>" +
						"<tr class='head'>" +
						"<td>Time&nbsp;</td>" +
						"<td>HR&nbsp;</td>" +
						"<td>Sys&nbsp;</td>" +
						"<td>Dia&nbsp;</td>" +
						"<td>FiO2&nbsp;</td>" +
						"<td>SpO2&nbsp;</td>" +
						"<td>Resp&nbsp;</td>" +
						"<td>LOC&nbsp;</td>" +
						"<td>L Eye&nbsp;</td>" +
						"<td>R Eye&nbsp;</td>" +
						"<td>BGL (mmol/L(mg/dL))</td>" +
						"<td>Temp (C(F))</td>" +
						"<td>Pain</td>" +
						"</tr>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM vitals WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						var conv ="", conv2="";
						if (row.temp != ""){
							if (row.temp_unit == "true")
								conv = row.temp + " (" + ((row.temp * (9/5)) + 32).toFixed(1) + ")";
							else
								conv = ((row.temp - 32) * (5/9)).toFixed(1) + " (" + row.temp + ")";
						}
						if (row.bgl != ""){
							if (row.bgl_unit == "true")
								conv2 = row.bgl + " (" + (row.bgl * 18).toFixed(1) + ")";
							else
								conv2 = (row.bgl / 18).toFixed(1) + " (" + row.bgl + ")";
						}
						table_vitals += "<tr class='question'>" +
									"<td>" + getFormatedTime(row.time) + "</td>" +
									"<td>" + row.hr + "</td>" +
									"<td>" + row.sys + "</td>" +
									"<td>" + row.dia + "</td>" +
								   "<td>" + $('#fio2 option[value=' + row.fio2 + ']').text() + "</td>" +
								   "<td>" + row.spo2 + "</td>" +
								   "<td>" + row.resp + "</td>" +
								   "<td>" + $('#level_of_c option[value=' + row.level_of_c + ']').text() + "</td>" +	
									"<td>" + row.left_eye + "</td>" +
									"<td>" + row.right_eye + "</td>" +
									"<td>" + conv2 + "</td>" +
									"<td>" + conv + "</td>" +
									"<td>" + row.pain + "</td>" +
									"</tr>";	
					}
					table_vitals += "</tbody></table><br /><hr>";
					if (emptyList == false)
						$('#vitals_sum').append(table_vitals);
				}
			);
		}
	);
	$('#chief_complaint_sum').html("");
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM chief_complaint WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var complaint = "";
						if (row.primary_complaint != "0") 
							complaint = complaints_list[parseInt(row.primary_complaint) - 1];
						else 
							complaint = row.primary_other;
						if (row.assessed == "true")
						$('#chief_complaint_sum').append(						
							"<strong><u>Chief Complaint</u></strong>&nbsp;<a href='#chief_complaint'>modifiy</a><br />" +	
							"<table><tbody>" +							
							"<tr><td class='question'>Primary Chief Complaint: </td><td class='answer'>" + complaint + "</td></tr>" +
							"<tr><td class='question'>Secondary Chief Complaint: </td><td class='answer'>" + row.secondary_complaint + "</td></tr>" +
							"<tr><td class='question'>Difficulty Breathing: </td><td class='answer'>" + positiveToYesNo(row.diff_breathing) + "</td></tr>" +
							"<tr><td class='question'>Chest Pain: </td><td class='answer'>" + positiveToYesNo(row.chest_pain) + "</td></tr>" +
							"<tr><td class='question'>Nausea: </td><td class='answer'>" + positiveToYesNo(row.nausea) + "</td></tr>" +
							"<tr><td class='question'>Vomiting: </td><td class='answer'>" + positiveToYesNo(row.vomiting) + "</td></tr>" +
							"<tr><td class='question'>Diarrhea: </td><td class='answer'>" + positiveToYesNo(row.diarrhea) + "</td></tr>" +
							"<tr><td class='question'>Dizziness: </td><td class='answer'>" + positiveToYesNo(row.dizziness) + "</td></tr>" +
							"<tr><td class='question'>Headache: </td><td class='answer'>" + positiveToYesNo(row.headache) + "</td></tr>" +
							"<tr><td class='question'>Loss of Cons.: </td><td class='answer'>" + positiveToYesNo(row.loc) + "</td></tr>" +
							"<tr><td class='question'>Numbness Tingling: </td><td class='answer'>" + positiveToYesNo(row.numb_tingling) + "</td></tr>" +
							"<tr><td class='question'>General Weakness: </td><td class='answer'>" + positiveToYesNo(row.gal_weakness) + "</td></tr>" +
							"<tr><td class='question'>Lethargy: </td><td class='answer'>" + positiveToYesNo(row.lethargy) + "</td></tr>" +
							"<tr><td class='question'>Neck Pain: </td><td class='answer'>" + positiveToYesNo(row.neck_pain) + "</td></tr>" +
							"</tbody></table><br /><hr>"
						);
						if ((row.assessed == "false") && (full_report == true))
								   $('#chief_complaint_sum').append(						
							"<strong><u>Chief Complaint</u></strong>&nbsp;<a href='#chief_complaint'>modifiy</a><br />" +	
							"<table><tbody>" +							
							"<tr><td class='question'>Primary Chief Complaint: </td><td class='answer'>No Complaint</td></tr>" +
							"<tr><td class='question'>Secondary Chief Complaint: </td><td class='answer'>No Complaint</td></tr>" +
							"<tr><td class='question'>Difficulty Breathing: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Chest Pain: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Nausea: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Vomiting: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Diarrhea: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Dizziness: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Headache: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Loss of Cons.: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Numbness Tingling: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>General Weakness: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Lethargy: </td><td class='answer'>No</td></tr>" +
							"<tr><td class='question'>Neck Pain: </td><td class='answer'>No</td></tr>" +
							"</tbody></table><br /><hr>"
							);

					}
				}
			);
		}
	);	
	$('#patient_hx_sum').html("");
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM patient_hx WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var a = [], a_names = [];
						var c = [], c_names = [];
						var m = [], m_names = [];
						var pArray =[];
						if (row.allergies != "") a = (row.allergies).split(",");
						if (row.conditions != "") c = (row.conditions).split(",");
						if (row.medications != "") m = (row.medications).split(",");
						for (var j=0; j < a.length; j++){
							var r = a[j];
							a_names[j] = listOfAllergies[r];
						}
						if (row.custom_allergies != '')
								   a_names.push(row.custom_allergies);
						for (var j=0; j < c.length; j++){
							var r = c[j];
							var prefix = r.substr(0, 1);
							var suffix = r.substr(1, r.length);
							if (prefix == "C")
								pArray = cvs;
							if (prefix == "R")
								pArray = resp;
							if (prefix == "G")
								pArray = gugi;
							if (prefix == "N")
								pArray = neuro;
							if (prefix == "E")	
								pArray = endocrine;
							if (prefix == "P")
								pArray = psych;
							c_names[j] = pArray[suffix];
						}
						if (row.custom_conditions != '')
								   c_names.push(row.custom_conditions);
						for (var j=0; j < m.length; j++){
							var r = m[j];
							m_names[j] = medication_generic_alpha[r]  + " (" + medication_trade_alpha[r] + ")";
						}
						if (row.custom_medications != '')
								   m_names.push(row.custom_medications);
						if (row.assessed == "true")
							$('#patient_hx_sum').append(						
							"<strong><u>Patient hx</u></strong>&nbsp;<a href='#patient_hx'>modifiy</a><br />" +
							"<table><tbody>" +							
							"<tr><td class='question'>Allergies: </td><td class='answer'>" + a_names.join(', ') + "</td></tr>" +
							"<tr><td class='question'>Home Medications: </td><td class='answer'>" + m_names.join(', ') + "</td></tr>" +
							"<tr><td class='question'>Medical Cond. / Proc.: </td><td class='answer'>" + c_names.join(', ') + "</td></tr>" +
							"</tbody></table><br /><hr>"
						);
						if ((row.assessed == "false") && (full_report == true))
								   $('#patient_hx_sum').append(						
						   "<strong><u>Patient hx</u></strong>&nbsp;<a href='#patient_hx'>modifiy</a><br />" +
						   "<table><tbody>" +							
						   "<tr><td class='question'>Allergies: </td><td class='answer'>None</td></tr>" +
						   "<tr><td class='question'>Home Medications: </td><td class='answer'>None</td></tr>" +
						   "<tr><td class='question'>Medical Cond. / Proc.: </td><td class='answer'>None</td></tr>" +
						   "</tbody></table><br /><hr>"
						   );

					}
				}
			);
		}
	);
	$('#exam_sum').html("");
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM apgar WHERE patient = ?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);						
						apg1 = row.total1;
						apg5= row.total5;
					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM neuro WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						//Calcul GCS
						var eyes = parseInt(row.eyes);
						var verbal = parseInt(row.verbal);
						var motor = parseInt(row.motor);
						var total = eyes + verbal + motor;
						var fds="", ads="", gcs_apgar="";
						if (row.facial_droop == "true") fds = " " + boolToChoice(row.facial_droop_side, "Left", "Right") + " side";
						if (row.arm_drift == "true") ads = " " + boolToChoice(row.arm_drift_side, "Left", "Right") + " side";
						if (row['gcs'] == "true") 
								gcs_apgar = "<tr><td class='question'>GCS: </td><td class='answer'>" + total +
								   " (eyes:" + eyes + ", verbal:" + verbal + ", motor:" + motor + ")</td></tr>";
						else
								gcs_apgar = "<tr><td class='question'>APGAR: </td><td class='answer'>1 min:" + apg1 + ", " + "5 min:" + apg5 +"</td></tr>";
								   
						if ((row.assessed == "false") && (full_report == true))
							if (row.gcs == "true") 
								gcs_apgar = "<tr><td class='question'>GCS: </td><td class='answer'>15 (eyes:4, verbal:5, motor:6)</td></tr>";
							else
								gcs_apgar = "<tr><td class='question'>APGAR: </td><td class='answer'>1 min:11, 5 min:11</td></tr>";
								   
						if (row.assessed == "true")
								   export_neuro =						
							"<strong><u>Neuro</u></strong>&nbsp;<a href='#neuro'>modifiy</a><br />" +	
							"<table><tbody>" +							
							"<tr><td class='question'>Response: </td><td class='answer'>" + $('#avpu option[value=' + row.avpu + ']').text() + "</td></tr>" +
							gcs_apgar +
							"<tr><td class='question'>PMS: </td><td class='answer'>" +
							" LUX: " + positiveToYesNo(row.luxr) + " RUX: " + positiveToYesNo(row.ruxr) +
							" LLX: " + positiveToYesNo(row.llxr) + " RLX: " + positiveToYesNo(row.rlxr) + "</td></tr>" +
							"<tr><td class='question'>Suspect Stroke: </td><td class='answer'>" + boolToChoice(row.suspect_stroke, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Facial Droop: </td><td class='answer'>" + boolToChoice(row.facial_droop, "Yes", "No") + fds + "</td></tr>" +
							"<tr><td class='question'>Arm Drift: </td><td class='answer'>" + boolToChoice(row.arm_drift, "Yes", "No") + ads + "</td></tr>" +
							"<tr><td class='question'>Speech: </td><td class='answer'>" + $('#speech option[value=' + row.speech + ']').text() + "</td></tr>" +
							"</tbody></table><br /><hr>";
						if ((row.assessed == "false") && (full_report == true))
								   export_neuro =						
						   "<strong><u>Neuro</u></strong>&nbsp;<a href='#neuro'>modifiy</a><br />" +	
						   "<table><tbody>" +							
						   "<tr><td class='question'>Response: </td><td class='answer'>Alert and Oriented x4</td></tr>" +
						   gcs_apgar +
						   "<tr><td class='question'>PMS: </td><td class='answer'>" +
						   " LUX: positive, RUX: positive, LLX: positive, RLX: positive</td></tr>" +
						   "<tr><td class='question'>Suspect Stroke: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Facial Droop: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Arm Drift: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Speech: </td><td class='answer'>Normal</td></tr>" +
						   "</tbody></table><br /><hr>";
								   
					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM abc WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var tds="", fcs="", pel="", eds="";
						if (row.tracheal_deviation == "true") tds = " " + boolToChoice(row.tracheal_deviation_side, "Left", "Right") + " side";
						if (row.flailed_chest == "true") fcs = " " + boolToChoice(row.flailed_chest_side, "Left", "Right") + " side";
						if (row.peripheral_edema == "true") {
							pel = " " + $('#peripheral_edema_location option[value=' + row.peripheral_edema_location + ']').text();
							eds = "<tr><td class='question'>Edema Severity: </td><td class='answer'>" + $('#edema_severity option[value=' + row.edema_severity + ']').text()+ "</td></tr>";}
						if (row.assessed == "true")
							export_abc = 
							"<strong><u>ABC's</u></strong>&nbsp;<a href='#abcs'>modifiy</a><br />" +						
							"<table><tbody>" +	
							"<tr><td class='question'>Open and Patent: </td><td class='answer'>" + boolToChoice(row.open_patent, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Tracheal Deviation: </td><td class='answer'>" + boolToChoice(row.tracheal_deviation, "Yes", "No") + tds + "</td></tr>" +
							"<tr><td class='question'>Interventions: </td><td class='answer'>" + boolToChoice(row.interventions, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Breathing Type : </td><td class='answer'>" + $('#breathing_type option[value=' + row.breathing_type + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Laboured: </td><td class='answer'>" + boolToChoice(row.laboured, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Effective: </td><td class='answer'>" + boolToChoice(row.effective, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Accessory Muscle: </td><td class='answer'>" + boolToChoice(row.accessory_muscle, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Nasal Flare: </td><td class='answer'>" + boolToChoice(row.nasal_flare, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Cough: </td><td class='answer'>" + boolToChoice(row.cough, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Productive: </td><td class='answer'>" + boolToChoice(row.productive, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Subcut. Emphysema: </td><td class='answer'>" + boolToChoice(row.subcut_emph, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Flailed Chest: </td><td class='answer'>" + boolToChoice(row.flailed_chest, "Yes", "No") + fcs + "</td></tr>" +
							"<tr><td class='question'>Suspect Pneumothorax: </td><td class='answer'>" + boolToChoice(row.suspect_pneu, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Suspect Hemothorax: </td><td class='answer'>" + boolToChoice(row.suspect_hemo, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>UL Lung sound: </td><td class='answer'>" + $('#UL_Lung_Sound option[value=' + row.ul_sound + ']').text() + "</td></tr>" +
							"<tr><td class='question'>UR Lung sound: </td><td class='answer'>" + $('#UR_Lung_Sound option[value=' + row.ur_sound + ']').text() + "</td></tr>" +
							"<tr><td class='question'>LL Lung sound: </td><td class='answer'>" + $('#LL_Lung_Sound option[value=' + row.ll_sound + ']').text() + "</td></tr>" +
							"<tr><td class='question'>LR Lung sound: </td><td class='answer'>" + $('#LR_Lung_Sound option[value=' + row.lr_sound + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Pulse Location: </td><td class='answer'>" + $('#pulse_location option[value=' + row.pulse_location + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Pulse Regularity: </td><td class='answer'>" + boolToChoice(row.pulse_regularity, "Regular", "Irregular") + "</td></tr>" +
							"<tr><td class='question'>Pulse Quality: </td><td class='answer'>" + $('#pulse_quality option[value=' + row.pulse_quality + ']').text() + "</td></tr>" +
							"<tr><td class='question'>JVD: </td><td class='answer'>" + boolToChoice(row.jvd, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Cap Refill: </td><td class='answer'>" + boolToChoice(row.cap_refill, "Brisk", "Delayed") + "</td></tr>" +
							"<tr><td class='question'>Skin: </td><td class='answer'>" + $('#skin option[value=' + row.skin + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Temperature: </td><td class='answer'>" + $('#abctemp option[value=' + row.abctemp + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Skin Condition: </td><td class='answer'>" + boolToChoice(row.dry, "Dry", "Diaphoretic") + "</td></tr>" +
							"<tr><td class='question'>Heart Tones: </td><td class='answer'>" + $('#heart_tones option[value=' + row.heart_tones + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Heart Tones Quality: </td><td class='answer'>" + $('#heart_tones_quality option[value=' + row.heart_tones_quality + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Peripheral Edema: </td><td class='answer'>" + boolToChoice(row.peripheral_edema, "Yes", "No") + pel + "</td></tr>" +
							eds +
							"</tbody></table><br /><hr>";
						if ((row.assessed == "false") && (full_report == true))
						   export_abc = 
						   "<strong><u>ABC's</u></strong>&nbsp;<a href='#abcs'>modifiy</a><br />" +						
						   "<table><tbody>" +	
						   "<tr><td class='question'>Open and Patent: </td><td class='answer'>Yes</td></tr>" +
						   "<tr><td class='question'>Tracheal Deviation: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Interventions: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Breathing Type : </td><td class='answer'>Regular</td></tr>" +
						   "<tr><td class='question'>Laboured: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Effective: </td><td class='answer'>Yes</td></tr>" +
						   "<tr><td class='question'>Accessory Muscle: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Nasal Flare: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Cough: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Subcut. Emphysema: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Flailed Chest: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Suspect Pneumothorax: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Suspect Hemothorax: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>UL Lung sound: </td><td class='answer'>Clear</td></tr>" +
						   "<tr><td class='question'>UR Lung sound: </td><td class='answer'>Clear</td></tr>" +
						   "<tr><td class='question'>LL Lung sound: </td><td class='answer'>Clear</td></tr>" +
						   "<tr><td class='question'>LR Lung sound: </td><td class='answer'>Clear</td></tr>" +
						   "<tr><td class='question'>Pulse Location: </td><td class='answer'>Radial</td></tr>" +
						   "<tr><td class='question'>Pulse Regularity: </td><td class='answer'>Strong</td></tr>" +
						   "<tr><td class='question'>Pulse Quality: </td><td class='answer'>Regular</td></tr>" +
						   "<tr><td class='question'>JVD: </td><td class='answer'>No</td></tr>" +
						   "<tr><td class='question'>Cap Refill: </td><td class='answer'>Brisk</td></tr>" +
						   "<tr><td class='question'>Skin: </td><td class='answer'>Normal</td></tr>" +
						   "<tr><td class='question'>Temperature: </td><td class='answer'>Warm</td></tr>" +
						   "<tr><td class='question'>Skin Condition: </td><td class='answer'>Dry</td></tr>" +
						   "<tr><td class='question'>Heart Tones: </td><td class='answer'>Normal</td></tr>" +
						   "<tr><td class='question'>Heart Tones Quality: </td><td class='answer'>Clear</td></tr>" +
						   "<tr><td class='question'>Peripheral Edema: </td><td class='answer'>None</td></tr>" +
						   "</tbody></table><br /><hr>";
					}
				}
			);
		}
	);

	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_auto WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var sb="", ab="", he="", le="", conv="";
						if (row.car == "true") {sb = " Seatbelt: " + boolToChoice(row.seatbelt, "Yes", "No"); ab = ", Airbag: " + boolToChoice(row.airbag, "Yes", "No"); }
						if (row.car == "false") {he = " Helmet: " + boolToChoice(row.helmet, "Yes", "No"); le = ", Protective Clothes: " + boolToChoice(row.leathers, "Yes", "No"); }
						if (row.approx_speed != ""){
							if (row.speed_unit == "true")
								conv = row.approx_speed + "kph (" + (row.approx_speed / 1.609344).toFixed(0) + "mph)";
							else
								conv = (row.approx_speed * 1.609344).toFixed(0) + "kph (" + row.approx_speed + "mph)";
						}
						var photo="none";
						if (row.photo != "")
							photo = row.photo;
						if (row.assessed == "true") 
							export_auto_trauma = 						
							"<strong><u>Trauma Auto</u></strong>&nbsp;<a href='#auto'>modifiy</a><br />" +		
							"<table><tbody>" +							
							"<tr><td class='question'>Vehicle: </td><td class='answer'>" + boolToChoice(row.car, "Car", "Motorcycle") + "</td></tr>" +
							"<tr><td class='question'>Seat: </td><td class='answer'>" + getSeat(row.seat) + "</td></tr>" +
							"<tr><td class='question'>Safety gear: </td><td class='answer'>" + sb + ab + he + le + "</td></tr>" +
							"<tr><td class='question'>Occupants: </td><td class='answer'>" + row.nb_occupants + "</td></tr>" +
							"<tr><td class='question'>Speed: </td><td class='answer'>" + conv + "</td></tr>" +
							"<tr><td class='question'>Removed By: </td><td class='answer'>" + $('#removed_by option[value=' + row.removed_by + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Details given by: </td><td class='answer'>" + $('#per option[value=' + row.per + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Attached Picture: </td><td class='answer'><img src='" + photo + "' /></td></tr>" +	   
							"</tbody></table><br /><hr>";
						if ((row.assessed == "false") && (full_report == true))
								   export_auto_trauma = 						
								   "<strong><u>Trauma Auto</u></strong>&nbsp;<a href='#auto'>modifiy</a><br />" +		
								   "No auto trauma<br /><hr>";
					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_penetrating WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var ctrl="", sys_inv ="";
						if (row.bleeding == "true") ctrl = " Controlled: " + boolToChoice(row.controlled, "Yes", "No");
						sys_inv = boolToEmpty(row.head, "Head") +
									boolToEmpty(row.neck, "Neck") +
									boolToEmpty(row.chest, "Chest") +
									boolToEmpty(row.abd, "ABD") +
									boolToEmpty(row.pelvis, "Pelvis") +
									boolToEmpty(row.ulxr, "ULXR") +
									boolToEmpty(row.urxr, "URXR") +
									boolToEmpty(row.llxr, "LLXR") +
									boolToEmpty(row.lrxr, "LRXR") +
									boolToEmpty(row.back, "Back");
						if (sys_inv == "") sys_inv ="No systems involved";
						var photo="none";
						if (row.photo != "")
							photo = row.photo;
						if (row.assessed == "true") 
							export_penetrating_trauma =						
							"<strong><u>Trauma Penetrating</u></strong>&nbsp;<a href='#penetrating'>modifiy</a><br />" +
							"<table><tbody>" +								
							"<tr><td class='question'>Assault: </td><td class='answer'>" + boolToChoice(row.assault, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>MOI: </td><td class='answer'>" + row.moi + "</td></tr>" +
							"<tr><td class='question'>Velocity: </td><td class='answer'>" + boolToChoice(row.velocity, "High", "Low") + "</td></tr>" +
							"<tr><td class='question'>Bleeding: </td><td class='answer'>" + boolToChoice(row.bleeding, "Yes", "No") + ctrl + "</td></tr>" +
							"<tr><td class='question'>Systems involved: </td><td class='answer'>" + sys_inv + "</td></tr>" +
							"<tr><td class='question'>Attached Picture: </td><td class='answer'><img src='" + photo + "' /></td></tr>" +
							"</tbody></table><br /><hr>";
						if ((row.assessed == "false") && (full_report == true))
								   export_penetrating_trauma =						
								   "<strong><u>Trauma Penetrating</u></strong>&nbsp;<a href='#penetrating'>modifiy</a><br />" +
								   "No penetrating trauma<br /><hr>";
					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_blunt WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var ctrl="", sys_inv ="";
						if (row.bleeding == "true") ctrl = " Controlled: " + boolToChoice(row.controlled, "Yes", "No");
						sys_inv = boolToEmpty(row.head, "Head") +
									boolToEmpty(row.neck, "Neck") +
									boolToEmpty(row.chest, "Chest") +
									boolToEmpty(row.abd, "ABD") +
									boolToEmpty(row.pelvis, "Pelvis") +
									boolToEmpty(row.ulxr, "ULXR") +
									boolToEmpty(row.urxr, "URXR") +
									boolToEmpty(row.llxr, "LLXR") +
									boolToEmpty(row.lrxr, "LRXR") +
									boolToEmpty(row.back, "Back");
						if (sys_inv == "") sys_inv ="No systems involved";
						var photo="none";
						if (row.photo != "")
							photo = row.photo;
						if (row.assessed == "true") 
							export_blunt_trauma =						
							"<strong><u>Trauma Blunt</u></strong>&nbsp;<a href='#blunt'>modifiy</a><br />" +		
							"<table><tbody>" +							
							"<tr><td class='question'>Assault: </td><td class='answer'>" + boolToChoice(row.assault, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>MOI: </td><td class='answer'>" + row.moi + "</td></tr>" +
							"<tr><td class='question'>Bleeding: </td><td class='answer'>" + boolToChoice(row.bleeding, "Yes", "No") + ctrl + "</td></tr>" +
							"<tr><td class='question'>Systems involved: </td><td class='answer'>" + sys_inv + "</td></tr>" +
							"<tr><td class='question'>Attached Picture: </td><td class='answer'><img src='" + photo + "' /></td></tr>" +
							"</tbody></table><br /><hr>";
						if ((row.assessed == "false") && (full_report == true))
								   export_blunt_trauma =						
								   "<strong><u>Trauma Blunt</u></strong>&nbsp;<a href='#blunt'>modifiy</a><br />" +		
								   "No blunt trauma<br /><hr>";
								   
					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_fall WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var ctrl="", time="", sys_inv ="";
						if (row.bleeding == "true") ctrl = " Controlled: " + boolToChoice(row.controlled, "Yes", "No");
						if (row.loss_of_c == "true") time = " during " + row.loss_of_c_time + " minutes";
						sys_inv = boolToEmpty(row.head, "Head") +
									boolToEmpty(row.neck, "Neck") +
									boolToEmpty(row.chest, "Chest") +
									boolToEmpty(row.abd, "ABD") +
									boolToEmpty(row.pelvis, "Pelvis") +
									boolToEmpty(row.ulxr, "ULXR") +
									boolToEmpty(row.urxr, "URXR") +
									boolToEmpty(row.llxr, "LLXR") +
									boolToEmpty(row.lrxr, "LRXR") +
									boolToEmpty(row.back, "Back");
						if (sys_inv == "") sys_inv ="No systems involved";
						var photo="none";
						if (row.photo != "")
							photo = row.photo;
						if (row.assessed == "true") 
							export_fall_trauma =						
							"<strong><u>Trauma Fall</u></strong>&nbsp;<a href='#fall'>modifiy</a><br />" +		
							"<table><tbody>" +							
							"<tr><td class='question'>Assault: </td><td class='answer'>" + boolToChoice(row.assault, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Distance: </td><td class='answer'>" + row.distance + " " + boolToChoice(row.controlled, "m", "ft") + "</td></tr>" +
							"<tr><td class='question'>Surface: </td><td class='answer'>" + row.surface + "</td></tr>" +
							"<tr><td class='question'>Loss of Consciousness: </td><td class='answer'>" + boolToChoice(row.loss_of_c, "Yes", "No") + ctrl + "</td></tr>" +
							"<tr><td class='question'>Bleeding: </td><td class='answer'>" + boolToChoice(row.bleeding, "Yes", "No") + ctrl + "</td></tr>" +
							"<tr><td class='question'>Systems involved: </td><td class='answer'>" + sys_inv + "</td></tr>" +
							"<tr><td class='question'>Attached Picture: </td><td class='answer'><img src='" + photo + "' /></td></tr>" +
							"</tbody></table><br /><hr>";
						if ((row.assessed == "false") && (full_report == true))
								   export_fall_trauma =						
								   "<strong><u>Trauma Fall</u></strong>&nbsp;<a href='#fall'>modifiy</a><br />" +		
								   "No fall trauma<br /><hr>";
					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM trauma_burn WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var sys_inv = "";
						sys_inv = valueToEmpty(row.head_front, "Head front") +
									valueToEmpty(row.head_back, "Head back") +
									valueToEmpty(row.chest, "Chest") +
									valueToEmpty(row.abdomen, "Abdomen") +
									valueToEmpty(row.upper_back, "Upper back") +
									valueToEmpty(row.lower_back, "Lower back") +
									valueToEmpty(row.ulx_up_front, "Upper left arm front") +
									valueToEmpty(row.ulx_low_front, "Lower left arm front") +
									valueToEmpty(row.ulx_up_back, "Upper left arm back") +
									valueToEmpty(row.ulx_low_back, "Lower left arm back") +
									valueToEmpty(row.urx_up_front, "Upper right arm front") +
									valueToEmpty(row.urx_low_front, "Lower right arm front") +
									valueToEmpty(row.urx_up_back, "Upper right arm back") +
									valueToEmpty(row.urx_low_back, "Lower right arm back") +
									valueToEmpty(row.llx_up_front, "Upper left leg front") +
									valueToEmpty(row.llx_low_front, "Lower left leg front") +
									valueToEmpty(row.llx_up_back, "Upper left leg back") +
									valueToEmpty(row.llx_low_back, "Lower left leg back") +
									valueToEmpty(row.lrx_up_front, "Upper right leg front") +
									valueToEmpty(row.lrx_low_front, "Lower right leg front") +
									valueToEmpty(row.lrx_up_back, "Upper right leg back") +
									valueToEmpty(row.lrx_low_back, "Lower right leg back");
						var photo="none";
						if (row.photo != "")
							photo = row.photo;
						if (row.assessed == "true") 
							export_burn_trauma =						
							"<strong><u>Trauma Burn</u></strong>&nbsp;<a href='#burn'>modifiy</a><br />" +	
							"<table><tbody>" +							
							"<tr><td class='question'>Body Type: </td><td class='answer'>" + row.body_type + "</td></tr>" +
							"<tr><td class='question'>Surface burnt: </td><td class='answer'><strong>" + row.total_surface + " %</strong></td></tr>" +
							"<tr><td class='question'>Systems involved: </td><td class='answer'>" + sys_inv + "</td></tr>" +
							"<tr><td class='question'>Attached Picture: </td><td class='answer'><img src='" + photo + "' /></td></tr>" +
							"</tbody></table><br /><hr>";
						if ((row.assessed == "false") && (full_report == true))
							export_burn_trauma =						
								   "<strong><u>Trauma Burn</u></strong>&nbsp;<a href='#burn'>modifiy</a><br />" +	
								   "No burn trauma<br /><hr>";
					}
				}
			);
		}
	);

	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM gi_gu WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);						
						if (row.gi_assessed == "true")
							export_gi_gu +=
								"<strong><u>GI</u></strong>&nbsp;<a href='#gi_gu'>modifiy</a><br />" +
								"<table><tbody>" +
								"<tr><td class='question'>GI is: </td><td class='answer'>" + boolToChoice(row.soft, "Soft", "Hard") + ", " +
								boolToChoice(row.flat, "Flat", "Distended") + ", " +
								boolToChoice(row.tender, "Non Tender", "Tender") + "</td></tr>" +
								"<tr><td class='question'>Rebound: </td><td class='answer'>" + boolToChoice(row.rebound, "Yes", "No") + "</td></tr>" +
								"<tr><td class='question'>Location of pain: </td><td class='answer'>" +
								boolToEmpty(row.luq, "Left Upper Quarter ") +
								boolToEmpty(row.ruq, "Right Upper Quarter ") +
								boolToEmpty(row.llq, "Left Lower Quarter ") +
								boolToEmpty(row.rlq, "Right Lower Quarter ") +
								boolToEmpty(row.epigastric, "Epigastric ") +
								boolToEmpty(row.suprapubic, "Suprapubic") + "</td></tr>" +
								"<tr><td class='question'>Obese: </td><td class='answer'>" + boolToChoice(row.obese, "Yes", "No") + "</td></tr>" +
								"<tr><td class='question'>Last Bowel Movement: </td><td class='answer'>" + row.last_bm + "</td></tr>" +
								"<tr><td class='question'>Last Oral Intake: </td><td class='answer'>" + row.loi + "</td></tr>" +
								"</tbody></table><br /><hr>";

						if (row.gu_assessed == "true")
							export_gi_gu +=
								"<strong><u>GU</u></strong>&nbsp;<a href='#gi_gu'>modify</a><br />" +
								"<table><tbody>" +
								"<tr><td class='question'>Pain: </td><td class='answer'>" + boolToChoice(row.pain, "Yes", "No") + "</td><tr>" +
								"<tr><td class='question'>Frequency: </td><td class='answer'>" + boolToChoice(row.frequency, "Yes", "No") + "</td><tr>" +
								"<tr><td class='question'>Hematuria: </td><td class='answer'>" + boolToChoice(row.hematuria, "Yes", "No") + "</td><tr>" +
								"<tr><td class='question'>Incontinence: </td><td class='answer'>" + boolToChoice(row.incontinence, "Yes", "No") + "</td><tr>" +
								"<tr><td class='question'>Bladder Distention: </td><td class='answer'>" + boolToChoice(row.bladder_distention, "Yes", "No") + "</td><tr>" +
								"<tr><td class='question'>Urinary Urgency: </td><td class='answer'>" + boolToChoice(row.urinary_urgency, "Yes", "No") + "</td><tr>" +
								"<tr><td class='question'>Last Void: </td><td class='answer'>" + row.last_void + "</td><tr>" +
								"</tbody></table><br /><hr>";

						var pregnant_related="", gest="", rupt="", mvmt="", ctrct="";
						if (row.gestation_known == "true") gest = row.gest_weeks + " weeks";
						if (row.membr_intact == "false") rupt = ", rupture at:" + row.time_ruptured + ", fluid:" + row.fluid;
						if (row.fetal_mvmt == "true") mvmt = ", last movement at:" + row.last_mvmt + ", " + row.mvmt_per_hr + " per hr";
						if (row.contractions == "true") ctrct = ", duration:" + row.contraction_duration + "/min.sec, separation:" + row.contraction_separation + "/min.sec";
						if (row.pregnant == "1")
							pregnant_related =
								"<tr><td class='question'>EDC: </td><td class='answer'>" + row.edc + "</td><tr>" +
								"<tr><td class='question'>Gestation is known: </td><td class='answer'>" + boolToChoice(row.gestation_known, "Yes", "No") + " " + gest + "</td><tr>" +
								"<tr><td class='question'>Membrane intact: </td><td class='answer'>" + boolToChoice(row.membr_intact, "Yes", "No") + rupt + "</td><tr>" +
								"<tr><td class='question'>Expected babies: </td><td class='answer'>" + row.expected_babies + "</td><tr>" +
								"<tr><td class='question'>Fetal movement: </td><td class='answer'>" + boolToChoice(row.fetal_mvmt, "Yes", "No") + mvmt + "</td><tr>" +
								"<tr><td class='question'>Contractions: </td><td class='answer'>" + boolToChoice(row.contractions, "Yes", "No") + ctrct + "</td><tr>";
						if ((male == "false") && (row.gyn_assessed == "true"))
							export_gi_gu +=
								"<strong><u>Ob/Gyn</u></strong>&nbsp;<a href='#gi_gu'>modifiy</a><br />" +
								"<table><tbody>" +
								"<tr><td class='question'>Gravid: </td><td class='answer'>" + row.gravid + "</td><tr>" +
								"<tr><td class='question'>Term: </td><td class='answer'>" + row.term + "</td><tr>" +
								"<tr><td class='question'>Para: </td><td class='answer'>" + row.para + "</td><tr>" +
								"<tr><td class='question'>Abortia: </td><td class='answer'>" + row.abortia + "</td><tr>" +
								"<tr><td class='question'>Live: </td><td class='answer'>" + row.live + "</td><tr>" +
								"<tr><td class='question'>Last Menstruation: </td><td class='answer'>" + row.last_menstruation + "</td><tr>" +
								"<tr><td class='question'>Vaginal Discharge: </td><td class='answer'>" + boolToChoice(row.discharge, "Yes", "No") + " " + row.substance + "</td><tr>" +
								"<tr><td class='question'>Pregnant: </td><td class='answer'>" + $('#pregnant option[value=' + row.pregnant + ']').text() + "</td><tr>" +
								pregnant_related + "</td><tr>" +
								"</tbody></table><br /><hr>";

						if ((row.gi_assessed == "false") && (row.gu_assessed == "false") && (full_report == true))
							export_gi_gu = 
								   "<strong><u>GI</u></strong>&nbsp;<a href='#gi_gu'>modifiy</a><br />" +
								   "No GI exam<br />No GU exam<br />No Ob/Gyn exam<br /><hr>";
					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM field_delivery WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var stim="", plac_time="", plac_intact="";
						if (row.stimulation == "true") stim = row.stimulation_type;
						if (row.placenta == "true") {
							plac_time = " at " + row.placenta_time; 
							plac_intact = " " + boolToChoice(row.placenta_intact, "Intact", "Not intact");
						}
						if (row.assessed == "true")
							export_field_delivery =
								"<strong><u>Field Delivery</u></strong>&nbsp;<a href='#field_delivery'>modifiy</a><br />" +
								"<table><tbody>" +
								"<tr><td class='question'>Presentation: </td><td class='answer'>" + row.presentation + "</td><tr>" +
								"<tr><td class='question'>Delivery time: </td><td class='answer'>" + row.delivery_time + "</td><tr>" +
								"<tr><td class='question'>Meconium: </td><td class='answer'>" + row.meconium + "</td><tr>" +
								"<tr><td class='question'>Cord cut at : </td><td class='answer'>" + row.cord_length + " inche(s) from baby</td><tr>" +
								"<tr><td class='question'>APGAR  </td><td class='answer'><strong>" + row.apgar1 + "</strong>, <strong>" + row.apgar5 + "</strong></td><tr>" +
								"<tr><td class='question'>Stimulation required: </td><td class='answer'>" + boolToChoice(row.stimulation, "Yes", "No") + stim + "</td><tr>" +
								"<tr><td class='question'>Placenta delivered: </td><td class='answer'>" + boolToChoice(row.placenta, "Yes", "No") + plac_time + plac_intact + "</td><tr>" +
								"</tbody></table><br /><hr>";
					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM muscular_skeletal WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var compl="No Complaints";
						if (row.nocomplaint == "false"){
							compl = row.muscular.split(',').join(', ');
						}
						if (row.assessed == "true")
							export_muscular =
							"<strong><u>Muscular Skeletal</u></strong>&nbsp;<a href='#muscular_skeletal'>modifiy</a><br />" +
							"Complaints: <strong>" + compl + "</strong><br /><br /><hr>";
						if ((row.assessed == "false") && (full_report == true))
							export_muscular =
							"<strong><u>Muscular Skeletal</u></strong>&nbsp;<a href='#muscular_skeletal'>modifiy</a><br />" +
							"Complaints: <strong>No Complaints</strong><br /><br /><hr>";
					}
				}
			);
		}
	);

	// Building Exam Output
	setTimeout(function(){
			$('#progress').remove();
			$('#exam_sum').html("");
		    $('#exam_sum').append(export_neuro + export_abc + export_auto_trauma + export_penetrating_trauma + export_blunt_trauma + export_fall_trauma + export_burn_trauma + export_gi_gu + export_muscular);
		   }, 3000
	);

	$('#procedures_sum').html("");
	var table_airway = "<strong><u>Airway</u></strong>&nbsp;<a href='#airway_list'>modifiy</a><br />" +
						"<table>" +
						"<tbody>" +
						"<tr class='head'>" +
						"<td>Time&nbsp;</td>" +
						"<td>Volume&nbsp;</td>" +
						"<td>Maneuver&nbsp;</td>" +
						"<td>OPA&nbsp;</td>" +
						"<td>NPA&nbsp;</td>" +
						"<td>BVM&nbsp;</td>" +
						"<td>Rate&nbsp;</td>" +
						"</tr>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM airway WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						table_airway += "<tr>" +
									"<td>" + getFormatedTime(row.time) + "</td>" +
									"<td>" + row.oxygen + "</td>" +
									"<td>" + $('#basic_maneuvers option[value=' + row.basic_maneuvers + ']').text() + "</td>" +
									"<td>" + $('#opa option[value=' + row.opa + ']').text() + "</td>" +
									"<td>" + $('#npa option[value=' + row.npa + ']').text() + "</td>" +
									"<td>" + boolToChoice(row.bvm, "Yes", "No") + "</td>" +
									"<td>" + row.rate + "/min</td>" +
									"</tr>";										
					}
					table_airway += "</tbody></table><br /><hr>";
					if (emptyList == false)
						export_airway = table_airway;
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM invasive_airway WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var infl="";	
						if (row.cuffed == "true")
							infl = " inflation: " + row.inflation + "mL";
						if (row.assessed == "true")
							export_invasive =
							"<strong><u>Invasive Airway</u></strong>&nbsp;<a href='#invasive_airway'>modifiy</a><br />" +
							"<table class='singleEntry'><tbody>" +
							"<tr><td class='question'>Secured: </td><td class='answer'>" + boolToChoice(row.secured, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Device: </td><td class='answer'>" + $('#airway_device option[value=' + row.device + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Size: </td><td class='answer'>" + row.size + "</td></tr>" +
							"<tr><td class='question'>Cuffed: </td><td class='answer'>" + boolToChoice(row.cuffed, "Yes", "No") + infl + "</td></tr>" +
							"<tr><td class='question'>Distance: </td><td class='answer'>" + row.distance + " cm</td></tr>" +
							"<tr><td class='question'>BVM: </td><td class='answer'>" + boolToChoice(row.bvm, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Attempts: </td><td class='answer'>" + row.attempts + "</td></tr>" +
							"<tr><td class='question'>Time: </td><td class='answer'>" + getFormatedDate(row.time) + "</td></tr>" +
							"</tbody></table><br /><hr>"
					}
				}
			);
		}
	);
	var table_vent = "<strong><u>Ventilator</u></strong>&nbsp;<a href='#ventilator_list'>modifiy</a><br />" +
						"<table>" +
						"<tbody>" +
						"<tr class='head'>" +
						"<td>Time&nbsp;</td>" +
						"<td>Ctrl&nbsp;</td>" +
						"<td>Mode&nbsp;</td>" +
						"<td>Rate&nbsp;</td>" +
						"<td>Tid.V&nbsp;</td>" +
						"<td>Insp&nbsp;</td>" +
						"<td>I:E&nbsp;</td>" +
						"<td>FiO2&nbsp;</td>" +
						"<td>Sens&nbsp;</td>" +
						"<td>Ex P&nbsp;</td>" +
						"<td>Ex Tid V&nbsp;</td>" +
						"<td>Max Insp P&nbsp;</td>" +
						"<td>Plat P&nbsp;</td>" +
						"<td>P Sup&nbsp;</td>" +
						"<td>High P lim&nbsp;</td>" +
						"<td>Low P lim&nbsp;</td>" +
						"<td>Low min V&nbsp;</td>" +
						"</tr>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM ventilator WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						table_vent += "<tr>" +
									"<td>" + getFormatedTime(row.time) + "</td>" +
									"<td>" + boolToChoice(row.control, "P", "V") + "</td>" +
									"<td>" + boolToChoice(row.mode, "SIMV", "A/Ctrl") + "</td>" +
									"<td>" + row.rate + "</td>" +
									"<td>" + row.tidal_v + "</td>" +
									"<td>" + row.insp_time + "</td>" +
									"<td>" + row.i_ratio + ":" + row.e_ratio + "</td>" +
									"<td>" + row.fiO2 + "</td>" +
									"<td>" + row.peep + "</td>" +
									"<td>" + row.sensitivity + "</td>" +
									"<td>" + row.expir_p + "</td>" +
									"<td>" + row.expir_tidal_v+ "</td>" +
									"<td>" + row.max_insp_p+ "</td>" +
									"<td>" + row.plateau_p+ "</td>" +
									"<td>" + row.p_support+ "</td>" +
									"<td>" + row.high_p_lim+ "</td>" +
									"<td>" + row.low_p_lim+ "</td>" +
									"<td>" + row.low_min_v+ "</td>" +
									"</tr>";						
					}
					table_vent += "</tbody></table><br /><hr>";
					if (emptyList == false)
						export_vent = table_vent;
				}
			);
		}
	);
	var table_cpap = "<strong><u>CPAP/BiPAP</u></strong>&nbsp;<a href='#cpap_bipap_list'>modifiy</a><br />" +
						"<table>" +
						"<tbody>" +
						"<tr class='head'>" +
						"<td>Time&nbsp;</td>" +
						"<td>Device&nbsp;</td>" +
						"<td>Size&nbsp;</td>" +
						"<td>FiO2&nbsp;</td>" +
						"<td>Peep&nbsp;</td>" +
						"<td>Pressure&nbsp;</td>" +
						"</tr>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM cpap_bipap WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						table_cpap += "<tr>" +
									"<td>" + getFormatedTime(row.time) + "</td>" +
									"<td>" + boolToChoice(row.device, "CPAP", "BiPAP") + "</td>" +
									"<td>" + row.size + "</td>" +
									"<td>" + row.fiO2 + "</td>" +
									"<td>" + row.peep + "</td>" +
									"<td>" + row.pressure + "</td>" +
									"</tr>";						
					}
					table_cpap += "</tbody></table><br /><hr>";
					if (emptyList == false)
						export_cpap = table_cpap;
				}
			);
		}
	);
	
	table_suction = "<strong><u>Suction</u></strong>&nbsp;<a href='#suction_list'>modifiy</a><br />" +
	"<table>" +
	"<tbody>" +
	"<tr class='head'>" +
	"<td>Time&nbsp;</td>" +
	"<td>Duration&nbsp;</td>" +
	"<td>Amount&nbsp;</td>" +
	"<td>Tip used&nbsp;</td>" +
	"<td>Tip size&nbsp;</td>" +
	"</tr>";
	
	db.transaction(
		function(transaction) {
				transaction.executeSql(
						'SELECT * FROM suction WHERE patient=?',
						[getCurrentPatientId()],
						function (transaction, result) {
							var emptyList = true;
							for (var i=0; i < result.rows.length; i++) {
									emptyList = false;
									var row = result.rows.item(i);
									table_suction += "<tr>" +
										  "<td>" + getFormatedTime(row.time) + "</td>" +
										  "<td>" + row.duration + "</td>" +
										  "<td>" + row.amount + "</td>" +
										  "<td>" + $('#suction_tip option[value=' + row.tip + ']').text() + "</td>" +
										  "<td>" + row.size + "</td>" +
										  "</tr>";	
							}
										
							table_suction += "</tbody></table><br /><hr>";
							if (emptyList == false)
									export_suction = table_suction;
						}
				);
		}
	);
	
	var table_ivio = "<strong><u>IV/IO</u></strong>&nbsp;<a href='#iv_io_list'>modifiy</a><br />" +
						"<table>" +
						"<tbody>" +
						"<tr class='head'>" +
						"<td>Time&nbsp;</td>" +
						"<td>Site&nbsp;</td>" +
						"<td>Side&nbsp;</td>" +
						"<td>Gauge&nbsp;</td>" +
						"<td>Attempts&nbsp;</td>" +
						"<td>Successful&nbsp;</td>" +
						"<td>Fluid&nbsp;</td>" +
						"</tr>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM iv_io WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						var flu="";
						if (row.fluid == '5') flu = row.fluid_other; else flu =$('#iv_io_fluid option[value=' + row.fluid + ']').text();
						table_ivio += "<tr>" +
									"<td>" + getFormatedTime(row.time) + "</td>" +
									"<td>" + $('#iv_io_site option[value=' + row.site + ']').text() + "</td>" +
									"<td>" + boolToChoice(row.side, "Left", "Right") + "</td>" +
									"<td>" + $('#iv_io_gauge option[value=' + row.gauge + ']').text() + "</td>" +
									"<td>" + row.attempts + "</td>" +
									"<td>" + boolToChoice(row.successful, "Yes", "No") + "</td>" +
									"<td>" + flu + "</td>" +
									"</tr>";						
					}
					table_ivio += "</tbody></table><br /><hr>";
					if (emptyList == false)
						export_ivio = table_ivio;
				}
			);
		}
	);
	
	table_splinting = "<strong><u>Splinting</u></strong>&nbsp;<a href='#splinting_list'>modifiy</a><br />" +
	"<table>" +
	"<tbody>" +
	"<tr class='head'>" +
	"<td>Time&nbsp;</td>" +
	"<td>Location&nbsp;</td>" +
	"<td>Side&nbsp;</td>" +
	"<td>PSM prior&nbsp;</td>" +
	"<td>PSM post&nbsp;</td>" +
	"<td>Traction applied&nbsp;</td>" +
	"<td>Type&nbsp;</td>" +
	"<td>Position&nbsp;</td>" +
	"</tr>";
	
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM splinting WHERE patient=?',
				[getCurrentPatientId()],
					function (transaction, result) {
						var emptyList = true;
						for (var i=0; i < result.rows.length; i++) {
							emptyList = false;
							var row = result.rows.item(i);
							var type="", position="";
							if (row['type'] == '7') type = row['type_other']; else type =$('#type_splint option[value=' + row['type'] + ']').text();
							if (row['position'] == '3') admin = row['position_other']; else admin =$('#splinting_position option[value=' + row['position'] + ']').text();
								   
							table_splinting += "<tr>" +
								   "<td>" + getFormatedTime(row.time) + "</td>" +
								   "<td>" + row.location + "</td>" +
								   "<td>" + boolToChoice(row.side, "Left", "Right") + "</td>" +
								   "<td>" + row.prior + "</td>" +
								   "<td>" + row.post + "</td>" +
								   "<td>" + boolToChoice(row.traction, "Yes", "No") + "</td>" +
								   "<td>" + type + "</td>" +
								   "<td>" + position + "</td>" +
								   "</tr>";
						}
						table_splinting += "</tbody></table><br /><hr>";
						if (emptyList == false)
							export_splinting = table_splinting;
					}
			);
		}
	);
	
	var table_medication = "<strong><u>Medication</u></strong>&nbsp;<a href='#medication_proc_list'>modifiy</a><br />" +
						"<table>" +
						"<tbody>" +
						"<tr class='head'>" +
						"<td>Time&nbsp;</td>" +
						"<td>Medication&nbsp;</td>" +
						"<td>Dose&nbsp;</td>" +
						"<td>Unit&nbsp;</td>" +
						"<td>Route&nbsp;</td>" +
						"<td>Indication&nbsp;</td>" +
						"<td>Admin by&nbsp;</td>" +
						"<td>Same dose&nbsp;</td>" +
						"</tr>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM medication WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						var route="", admin="", medicationName="";
						if (row.route == '16') route = row.route_other; else route =$('#medication_route option[value=' + row.route + ']').text();
						if (row.admin == '2') admin = row.admin_other; else admin =$('#medication_admin_by option[value=' + row.admin + ']').text();
						if (row.medication != '0'){
							if (row.isGeneric == "true"){
								medicationName = medication_generic_alpha[parseInt(row.medication)-1];
							}
							else{
								medicationName = medication_trade_alpha[convertToTradeNb(parseInt(row.medication)-1)];
							}
						}
						else{
							medicationName = row.medic_other;
						}
						table_medication += "<tr>" +
									"<td>" + getFormatedTime(row.time) + "</td>" +
									"<td>" + medicationName + "</td>" +
									"<td>" + row.dose + "</td>" +
									"<td>" + $('#medication_dose_unit option[value=' + row.dose_unit + ']').text() + "</td>" +
									"<td>" + route + "</td>" +
									"<td>" + row.indication + "</td>" +
									"<td>" + admin + "</td>" +
									"<td>" + row.same_dose + "</td>" +
									"</tr>";						
					}
					table_medication += "</tbody></table><br /><hr>";
					if (emptyList == false)
						export_medication = table_medication;
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM c_spine WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var siz="";	
						if (row.c_collar == "true")
							siz = " Size: " + $('#c_spine_size option[value=' + row.size + ']').text();
						if (row.assessed == "true")
							export_c_spine =
							"<strong><u>Spinal Motion Restriction</u></strong>&nbsp;<a href='#c_spine'>modifiy</a><br />" +
							"<table class='singleEntry'><tbody>" +
							"<tr><td class='question'>Manual C-Spine: </td><td class='answer'>" + boolToChoice(row.manual, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>C-Collar: </td><td class='answer'>" + boolToChoice(row.c_collar, "Yes", "No") + siz + "</td></tr>" +
							"<tr><td class='question'>Back Board: </td><td class='answer'>" + $('#c_spine_back_board option[value=' + row.backboard + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Transferred by: </td><td class='answer'>" + $('#c_spine_transfer option[value=' + row.transferred + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Secured by: </td><td class='answer'>" + $('#c_spine_Secured option[value=' + row.secured + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Time: </td><td class='answer'>" + getFormatedTime(row.time) + "</td></tr>" +
							"</tbody></table><br /><hr>"
					}
				}
			);
		}
	);
	var table_io = "<strong><u>IN's/OUT's</u></strong>&nbsp;<a href='#in_out_list'>modifiy</a><br />" +
						"<table>" +
						"<tbody>" +
						"<tr class='head'>" +
						"<td>Time&nbsp;</td>" +
						"<td>V In (mL)&nbsp;</td>" +
						"<td>Substance In&nbsp;</td>" +
						"<td>V Out (mL)&nbsp;</td>" +
						"<td>Substance Out&nbsp;</td>" +
						"</tr>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM in_out WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						var intake="", outtake="";
						if (row.intake_substance == '6') intake = row.intake_other; else intake =$('#intake_substance option[value=' + row.intake_substance + ']').text();
						if (row.outtake_substance == '6') outtake = row.outtake_other; else outtake =$('#outtake_substance option[value=' + row.outtake_substance + ']').text();
						table_io += "<tr>" +
									"<td>" + getFormatedTime(row.time) + "</td>" +
									"<td>" + row.intake_volume + "</td>" +
									"<td>" + intake + "</td>" +
									"<td>" + row.outtake_volume + "</td>" +
									"<td>" + outtake + "</td>" +
									"</tr>";						
					}
					table_io += "</tbody></table><br /><hr>";
					if (emptyList == false)
						export_io = table_io;
				}
			);
		}
	);
	var table_ecg = "<strong><u>ECG</u></strong>&nbsp;<a href='#ecg_list'>modifiy</a><br />" +
						"<table>" +
						"<tbody>" +
						"<tr class='head'>" +
						"<td>Time&nbsp;</td>" +
						"<td>Leads nb&nbsp;</td>" +
						"<td>Rhythm&nbsp;</td>" +
						"<td>Regular&nbsp;</td>" +
						"<td>BBB&nbsp;</td>" +
						"<td>ST Changes&nbsp;</td>" +
						"<td>PAC's&nbsp;</td>" +
						"<td>PVC's&nbsp;</td>" +
						"</tr>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM ecg WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						var bbb="", changes="";
						if (row.bbb == 'false') bbb = "No"; else bbb = "Yes " + boolToChoice(row.bbb_side, "Left", "Right");
						changes = 	positiveToTitle(row.bi, "i") +
									positiveToTitle(row.bavr, "aVr") +
									positiveToTitle(row.bv1, "V1") +
									positiveToTitle(row.bv4, "V4") +    
									positiveToTitle(row.bii, "ii") +
									positiveToTitle(row.bavl, "aVL") +
									positiveToTitle(row.bv2, "V2") +
									positiveToTitle(row.bv5, "V5") +
									positiveToTitle(row.biii, "iii") +
									positiveToTitle(row.bavf, "aVf") +
									positiveToTitle(row.bv3, "V3") +
									positiveToTitle(row.bv6, "V6");
									
						var photo="none";
						if (row.photo != "")
							photo = row.photo;
						table_ecg += "<tr>" +
									"<td>" + getFormatedTime(row.time) + "</td>" +
									"<td>" + boolToChoice(row.leads_nb, "3", "12") + "</td>" +
									"<td>" + $('#rhythm option[value=' + row.rhythm + ']').text() + "</td>" +
									"<td>" + boolToChoice(row.regular, "Yes", "No") + "</td>" +
									"<td>" + bbb + "</td>" +
									"<td>" + changes + "</td>" +
									"<td>" + boolToChoice(row.ecg_pacs, "Yes", "No") + "</td>" +
									"<td>" + boolToChoice(row.ecg_pvcs, "Yes", "No") + "</td>" +
								    "<td><img src='" + photo + "' /></td>" +
									"</tr>";						
					}
					table_ecg += "</tbody></table><br /><hr>";
					if (emptyList == false)
						export_ecg = table_ecg;
				}
			);
		}
	);

	// building Procedures output
	setTimeout(function(){
			$('#procedures_sum').html("");
		   $('#procedures_sum').append(export_airway + export_invasive + export_vent + export_cpap + export_suction + export_ivio + export_splinting + export_medication + export_c_spine + export_io + export_ecg);
		   }, 3000
	);

	$('#signatures_sum').html("");
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM signatures WHERE patient=?',
					[getCurrentPatientId()],
						function (transaction, result) {
								   for (var i=0; i < result.rows.length; i++) {
										  var row = result.rows.item(i);
										  var pat = "";
										  if (row.noSign == "true") 
												pat = "Unable to sign due to " + $('#unableToSignReason option[value=' + row.reason + ']').text();
										  else
												pat = "<canvas id='canvasPat' width='290' height='100'></canvas>";
										  if (row.assessed == "true"){
														$('#signatures_sum').html("");
														$('#signatures_sum').append(
																	  "<strong><u>Signatures</u></strong>&nbsp;<a href='#signatures'>modifiy</a><br />" +
																	  "<table><tbody>" +
																	  "<tr><td class='question'>Practitioner Name: </td><td class='answer'>" + row.sigPractitionerText + "</td></tr>" +
																	  "<tr><td class='question'>Practitioner Signature: </td><td class='answer'><canvas id='canvasPrac' width='290' height='100'></canvas></td></tr>" +
																	  "<tr><td class='question'>Patient Name: </td><td class='answer'>" + row.sigPatientText + "</td></tr>" +
																	  "<tr><td class='question'>Patient Signature: </td><td class='answer'>" + pat +"</td></tr>" +
																	  "<tr><td class='question'>Hosp. Repr. Name: </td><td class='answer'>" + row.sigHospReprText + "</td></tr>" +
																	  "<tr><td class='question'>Hosp. Repr. Signature: </td><td class='answer'><canvas id='canvasHosp' width='290' height='100'></canvas></td></tr>" +
																	  "<tr><td class='question'>Witness Name: </td><td class='answer'>" + row.sigWitnessText + "</td></tr>" +
																	  "<tr><td class='question'>Witness Signature: </td><td class='answer'><canvas id='canvasWit' width='290' height='100'></canvas></td></tr>" +
																	  "</tbody></table><br /><hr>"
														);
								   
												// Get Canvas Objects
												var pracCanvas = document.getElementById('canvasPrac');
												regenerateSig(pracCanvas, row.sigPractitioner);
												if (row.noSign == "false") {
													var patCanvas = document.getElementById('canvasPat');
													regenerateSig(patCanvas, row.sigPatient);
												}
												var hospCanvas = document.getElementById('canvasHosp');
												regenerateSig(hospCanvas, row.sigHospRepr);
												var witCanvas = document.getElementById('canvasWit');
												regenerateSig(witCanvas, row.sigWitness);
												
												// Create img objects
												var practImg = Canvas2Image.saveAsPNG(pracCanvas, true);
												if (row.noSign == "false")
													var patImg = Canvas2Image.saveAsPNG(patCanvas, true);
												var hospImg = Canvas2Image.saveAsPNG(hospCanvas, true);
												var witImg = Canvas2Image.saveAsPNG(witCanvas, true);
								   
												//give ids to those images
												practImg.id = "practImage";
												if (row.noSign == "false")
													patImg.id = "patImage";
												hospImg.id = "hospImage";
												practImg.id = "witImage";
								   
												// Remplacement du canvas par l'image
												pracCanvas.parentNode.replaceChild(practImg, pracCanvas);
												patCanvas.parentNode.replaceChild(patImg, patCanvas);
												hospCanvas.parentNode.replaceChild(hospImg, hospCanvas);
												witCanvas.parentNode.replaceChild(witImg, witCanvas);
								   
											}
											if ((row.assessed == "false") && (full_report == true))
												$('#signatures_sum').append(
															   "<strong><u>Signatures</u></strong>&nbsp;<a href='#signatures'>modifiy</a><br />" +
															   "No signatures yet<br /><hr>"
															   );
									}
							}
				);
			}
	);
	$('#call_info_sum').html("");
	populateAttendants();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM call_info WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var att1="", att2="", dri="", assist="", deter="";	
						if (row.attendant1 == "1")
							att1 = row.attendant1_other;
						else
							att1 = $('#call_info_attendant1 option[value=' + row.attendant1 + ']').text();
						if (row.attendant2 == "1")
							att2= row.attendant2_other;
						else
							att2 = $('#call_info_attendant2 option[value=' + row.attendant2 + ']').text();
						if (row.driver == "1")
							dri = row.driver_other;
						else
							dri = $('#call_info_driver option[value=' + row.driver + ']').text();
						if (row.assistance == "3")
							assist = row.other;
						else
							assist = $('#call_info_assistance option[value=' + row.assistance + ']').text();
						if ((row.det1 == "") && (row.det2 == "0") && (row.det3 == ""))
							deter = "";
						else
							deter = "<tr><td class='question'>Determinant: </td><td class='answer'>" + row.det1 + " " +
								   $('#call_info_det2 option[value=' + row.det2 + ']').text() + " " + row.det3 + "</td></tr>";
								   
						if (row.assessed == "true")
						$('#call_info_sum').append(
							"<strong><u>Call Info</u></strong>&nbsp;<a href='#call_info'>modifiy</a><br />" +
							"<table class='singleEntry'><tbody>" +
							"<tr><td class='question'>Attendant 1: </td><td class='answer'>" + att1 + "</td></tr>" +
							"<tr><td class='question'>Attendant 2 </td><td class='answer'>" + att2 + "</td></tr>" +
							"<tr><td class='question'>Driver </td><td class='answer'>" + dri + "</td></tr>" +
							"<tr><td class='question'>Unit nb: </td><td class='answer'>" + row.unit_nb + "</td></tr>" +
							"<tr><td class='question'>Run nb: </td><td class='answer'>" + row.run_nb + "</td></tr>" +
							"<tr><td class='question'>Respond to: </td><td class='answer'>" + row.respond + "</td></tr>" +
							"<tr><td class='question'>Milage start: </td><td class='answer'>" + row.milage_start + "</td></tr>" +
							"<tr><td class='question'>Milage end: </td><td class='answer'>" + row.milage_end + "</td></tr>" +
							"<tr><td class='question'>Code en route: </td><td class='answer'>" + row.code_en_route + "</td></tr>" +
							"<tr><td class='question'>Code return: </td><td class='answer'>" + row.code_return + "</td></tr>" +
							"<tr><td class='question'>Transported to: </td><td class='answer'>" + row.transported_to + "</td></tr>" +
							"<tr><td class='question'>Transport position: </td><td class='answer'>" + $('#call_info_transport_position option[value=' + row.transported_position + ']').text() + "</td></tr>" +
							"<tr><td class='question'>Time notified: </td><td class='answer'>" + getFormatedDate(row.time_notified) + "</td></tr>" +
							"<tr><td class='question'>Time en route: </td><td class='answer'>" + getFormatedDate(row.time_route) + "</td></tr>" +
							"<tr><td class='question'>Time on scene: </td><td class='answer'>" + getFormatedDate(row.time_on_scene) + "</td></tr>" +
							"<tr><td class='question'>Time depart: </td><td class='answer'>" + getFormatedDate(row.time_depart) + "</td></tr>" +
							"<tr><td class='question'>Time destination: </td><td class='answer'>" + getFormatedDate(row.time_destination) + "</td></tr>" +
							"<tr><td class='question'>Time transfer: </td><td class='answer'>" + getFormatedDate(row.time_transfer) + "</td></tr>" +
							"<tr><td class='question'>Time back service: </td><td class='answer'>" + getFormatedDate(row.time_back_service) + "</td></tr>" +
							"<tr><td class='question'>Time patient contact: </td><td class='answer'>" + getFormatedDate(row.time_patient_contact) + "</td></tr>" +
							"<tr><td class='question'>Gloves: </td><td class='answer'>" + positiveToYesNo(row.ppe_gloves) + "</td></tr>" +
							"<tr><td class='question'>Eye protection: </td><td class='answer'>" + positiveToYesNo(row.ppe_eyes) + "</td></tr>" +
							"<tr><td class='question'>Reflective gear: </td><td class='answer'>" + positiveToYesNo(row.ppe_reflective) + "</td></tr>" +
							"<tr><td class='question'>Isolation gear: </td><td class='answer'>" + positiveToYesNo(row.ppe_isolation) + "</td></tr>" +
							"<tr><td class='question'>Mask: </td><td class='answer'>" + positiveToYesNo(row.ppe_mask) + "</td></tr>" +
							deter +
							"<tr><td class='question'>Assistance given by: </td><td class='answer'>" + assist + "</td></tr>" +
							"</tbody></table><br /><hr>"
						);
						if ((row.assessed == "false") && (full_report == true))
								   $('#call_info_sum').append(
						  "<strong><u>Call Info</u></strong>&nbsp;<a href='#call_info'>modifiy</a><br />" +
						  "Not filled<br /><hr>"
						  );

					}
				}
			);
		}
	);
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM no_transport WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						var reason="", left="";	
						if (row.reason == "5")
							reason = row.reason_other;
						else
							reason = $('#transport_reason_refusal option[value=' + row.reason + ']').text();
						if (row.left_with == "7")
							left = row.left_with_other;
						else
							left = $('#transport_left_with option[value=' + row.left_with + ']').text();
						if (row.assessed == "true")
						$('#call_info_sum').append(
							"<strong><u>No transport</u></strong>&nbsp;<a href='#no_transport'>modifiy</a><br />" +
							"<table class='singleEntry'><tbody>" +
							"<tr><td class='question'>Patient mentally capable of refusing transport: </td><td class='answer'>" + boolToChoice(row.mentally_capable, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Pract. feels patient should be transported: </td><td class='answer'>" + boolToChoice(row.should_trans, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Patient informed of risks of no transport: </td><td class='answer'>" + boolToChoice(row.informed, "Yes", "No") + "</td></tr>" +
							"<tr><td class='question'>Reason for refusal: </td><td class='answer'>" + reason + "</td></tr>" +
							"<tr><td class='question'>Patient left with: </td><td class='answer'>" + left + "</td></tr>" +
							"<tr><td class='question'>Consult with: </td><td class='answer'>" + row.consult_with + "</td></tr>" +
							"</tbody></table><br /><hr>"
						);
					}
				}
			);
		}
	);
	$('#narrative_sum').html("");
	var table_narrative = "<strong><u>Narrative</u></strong>&nbsp;<a href='#narrative_list'>modifiy</a><br />" +
						"<table>" +
						"<tbody>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM narrative WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						table_narrative += "<tr>" +
									"<td>" + getFormatedTime(row.time) + "</td>" +
									"<td>" + row.narration + "</td>" +
									"</tr>";						
					}
					table_narrative += "</tbody></table><br /><hr>";
					if (emptyList == false)
						$('#narrative_sum').append(table_narrative);
					if ((emptyList == true) && (full_report == true))
						$('#narrative_sum').append(
								"<strong><u>Narrative</u></strong>&nbsp;<a href='#narrative_list'>modifiy</a><br />" +
								"No Narratives<br /><hr>");
				}
			);
		}
	);
	$('#code_sum').html("");
	var table_code = "<strong><u>Code</u></strong><br />" +
						"<table>" +
						"<tbody>";
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM code WHERE patient=?',
				[getCurrentPatientId()],
				function (transaction, result) {
					var emptyList = true;
					for (var i=0; i < result.rows.length; i++) {
						emptyList = false;
						var row = result.rows.item(i);
						table_code += "<tr>" +
									"<td>" + getFormatedPreciseTime(row.time) + "</td>" +
									"<td><strong>" + row.code_name + "</strong></td>" +
									"</tr>";						
					}
					table_code += "</tbody></table><br /><hr>";
					if (emptyList == false)
						$('#code_sum').append(table_code);
				}
			);
		}
	);
}


/***********************************************************************************/
/* 								converts true to yes									*/
/***********************************************************************************/
function boolToChoice(theBool, choice1, choice2){
	if (theBool == "true")
		return  choice1;
	else if (theBool == "false")
		return choice2;
}

/***********************************************************************************/
/* 								converts false to Empty									*/
/***********************************************************************************/
function boolToEmpty(theBool, str){
	if (theBool == "true")
		return str + "&nbsp;";
	else
		return "";
}

/***********************************************************************************/
/* 								converts 0 to Empty									*/
/***********************************************************************************/
function valueToEmpty(val, str){
	suffix ="";
	if (val == "1") suffix ="st";
	if (val == "2") suffix ="nd";
	if (val == "3") suffix ="rd";
	if (val == "0")
		return "";
	else
		return str + ": <strong>" + val + suffix + " degree</strong><br />";
}

/***********************************************************************************/
/* 								converts Positive to yes									*/
/***********************************************************************************/
function positiveToYesNo(posneg){
	if (posneg == "positive")
		return "Yes";
	else 
		if (posneg == "negative")
			return "No";
		else
			return "Not specified";
	
}

/***********************************************************************************/
/* 								converts Positive to title									*/
/***********************************************************************************/
function positiveToTitle(posneg, str){
	if (posneg == "positive")
		return "+"+ str +"&nbsp;";
	else 
		if (posneg == "negative")
			return "-"+ str +"&nbsp;";
		else
			return "";
}

/***********************************************************************************/
/* 								getSeat									*/
/***********************************************************************************/
function getSeat(seat){
	if (seat == "car1")
		return "Driver";
	if (seat == "car2")
		return "Front Passenger";
	if (seat == "car3")
		return "Passenger left side";
	if (seat == "car4")
		return "Passenger right side";
	if (seat == "car5")
		return "Back passenger left side";
	if (seat == "car6")
		return "Back passenger right side";
	if (seat == "motorcycle1")
		return "Driver";
	if (seat == "motorcycle2")
		return "Passenger";
	if (seat == "motorcycle3")
		return "Side car passenger";		
}

/***********************************************************************************/
/* 								customizing the export									*/
/***********************************************************************************/
function customizeExport(){
	displayOrNot('#export_patient_info', '#patient_info_sum');
	displayOrNot('#export_vitals', '#vitals_sum');
	displayOrNot('#export_chief_complaint', '#chief_complaint_sum');
	displayOrNot('#export_patient_hx', '#patient_hx_sum');
	displayOrNot('#export_exam', '#exam_sum');
	displayOrNot('#export_procedures', '#procedures_sum');
	displayOrNot('#export_signatures', '#signatures_sum');
	displayOrNot('#export_call_info', '#call_info_sum');
	displayOrNot('#export_narrative', '#narrative_sum');
	displayOrNot('#export_code_summary', '#code_sum');
}

/***********************************************************************************/
/* 								Display or not									*/
/***********************************************************************************/
function displayOrNot(checkboxName, sectionName){
	if ($(checkboxName).prop("checked") == true)
		$(sectionName).show();
	else 
		$(sectionName).hide();
}

/***********************************************************************************/
/* 									Redirect									*/
/***********************************************************************************/
function redirect(link, anim){
	jQT.goTo(link, anim);
}

/***********************************************************************************/
/* 								Load Patients List									*/
/***********************************************************************************/
function loadPatientsList() {
	
	// Hide Patient widget
	hidePatientPageWidget();
	
    $('#patients_sorted li:gt(0)').remove();
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'SELECT id, last_name, first_name FROM patients ORDER BY last_name;',
				[],
                function (transaction, result) {
                    for (var i=0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        var newEntryRow = $('#entryTemplate').clone();
                        newEntryRow.removeAttr('id');
                        newEntryRow.removeAttr('style');
                        newEntryRow.data('entryId', row.id);
						newEntryRow.data('lastName', row.last_name);
						newEntryRow.data('firstName', row.first_name);
                        newEntryRow.appendTo('#patients_sorted');
                        newEntryRow.find('.first_name').text(row.first_name);
                        newEntryRow.find('.last_name').text(row.last_name);
						newEntryRow.find('.unlock_line').bind('touchstart', function(e){
							var clickedEntry = $(this).parent();
							var clickedEntryId = clickedEntry.data('entryId');
							delete_show_hide(this);
							e.stopPropagation();
						});
						newEntryRow.find('.unlock_line').bind('click', function(e){
							e.stopPropagation();
							e.preventDefault();
						});
                        newEntryRow.find('.delete').bind('touchstart', function(e){
							var clickedEntry = $(this).parent();
							var clickedEntryId = clickedEntry.data('entryId');
							/* var answer = confirm("Do you really want to erase this patient from your iPhone?");
							if (answer){ */
								deletePatientById(clickedEntryId);
								clickedEntry.slideUp();
							/* } */
							e.stopPropagation();
						});
						newEntryRow.find('.delete').bind('click', function(e){
							e.stopPropagation();
							e.preventDefault();
						});
						newEntryRow.find('.last_name').parent().bind('click', function(e){
							var clickedEntry = $(this);
							var clickedEntryId = clickedEntry.data('entryId');
							var clickedLastName = clickedEntry.data('lastName');
							var clickedFirstName = clickedEntry.data('firstName');
							fillSessionStorage(clickedEntryId, clickedLastName, clickedFirstName);
							jQT.goTo('#patient', 'flip'); 
						});
                    }
                }, 
                errorHandler
            );
        }
    );
}

function deletePatientById(id) {
	db.transaction(
		function(transaction) {
			transaction.executeSql('DELETE FROM patients WHERE id=?;',
			[id], 
			function (){
				calculatePatients();
				deleteRelatedEntries(id);
			},
			errorHandler
			);
		}
	);
}

function fillSessionStorage(id, lastName, firstName){
	sessionStorage.currentPatientId = id;
}

/***********************************************************************************/
/* 								load Code									*/
/***********************************************************************************/
function loadCode(){
	// hide all buttons except Start
	$('#codeList li').hide();
	$('#code_start').show();
}

/***********************************************************************************/
/* 								save Code									*/
/***********************************************************************************/
function saveCode(myCode){
	console.log(getCurrentPatientId());
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'INSERT INTO code (patient, code_name, time) VALUES (?, ?, ?);',
				[getCurrentPatientId(), myCode, getSystemTime()],
				calculatePatients(),
				errorHandler
			);
		}
	);
}

/***********************************************************************************/
/* 								Load Code List									*/
/***********************************************************************************/
function loadCodeList(){
	
	// Show the widget menu
	showPatientPageWidget();
	
	$('#code_sorted li').remove();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT * FROM code WHERE patient = ? ORDER BY CAST(time AS INT);',
				[getCurrentPatientId()],
				function (transaction, result) {
                    for (var i=0; i < result.rows.length; i++) {
						$('#code_list ul.basic').hide();
                        var row = result.rows.item(i);
						$('#code_sorted').append("<li>" + getFormatedPreciseTime(row.time) + ": " + row.code_name + "</li>" );
					}
				},
				errorHandler
			);
		}
	);
}

function goToPage(pageID, anim, reverse){
	jQT.goTo(pageID, anim, reverse);
}

/***********************************************************************************/
/* 								Create new Patient from Code									*/
/***********************************************************************************/
function insertVoidPatientFromCode (){
	_uuid = UUID.generate();
	db.transaction(
		function(transaction) {
			transaction.executeSql(
				'INSERT INTO patients (id, last_name, first_name, date_of_birth, gender, weight, weight_unit, contact, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
				[_uuid, 'Code', getFormatedDate(getSystemTime()), '', 'true', '', 'false', 'false', getSystemTime()],
				function(){		
					setCurrentPatientId(_uuid);
					createDummyEntries();				
					var current_patient_name = last_name + ', ' + first_name;			// Rebuild patient's name
					calculatePatients();												// Refresh the counter
					showHideGCS();
				},
				errorHandler
			);
		}
	);
	return false;
}

function processCode(elem, code){
	if (getCurrentPatientId() == '0'){
		insertVoidPatientFromCode();
	}
	saveCode(code);
	var originalClass;
	switch(code)
	{
	case "CPR Start":
		$('#codeList li').show();
		doTimer();
		break;
	case "CPR Stop":
		stopCount();
		break;
	case "ROSC":
		jQT.goTo('#code_list', 'dissolve'); 
		stopCount();
		break;
	case "PRONOUNCE":
		jQT.goTo('#code_list', 'dissolve'); 
		stopCount();
		break;
	default:
	}
}

function errorHandler(transaction, error) {
	alert('Oops. Error was '+error.message+' (Code '+error.code+')');
	transaction.executeSql('INSERT INTO errors (code, message) VALUES (?, ?);', [error.code, error.message]);
	return false;
}

/***********************************************************************************/
/* 								Member Settings									*/
/***********************************************************************************/
function saveSettingsCore() {
	localStorage.employee_last_name = $('#employee_last_name').val();
	localStorage.employee_first_name = $('#employee_first_name').val();
	localStorage.employee_id = $('#employee_id').val();
	localStorage.employee_position = $('#employee_position option:selected').val();
	localStorage.employee_location = $('#employee_location').val();
    localStorage.sendReportTo = $('#send_report_to').val();
	var photo = document.getElementById('employeeImage').src;
	if (photo.substr(0,4) != "data") photo = '';
	localStorage.photoID = photo;
}
function saveSettings() {
	saveSettingsCore();
	jQT.goBack();
	return false;
}

function loadSettings() {
	
	// Hide Patient widget
	hidePatientPageWidget();
	$('#partner_last_name').val('');
	$('#partner_first_name').val('');
	
	$('#employee_last_name').val(localStorage.employee_last_name);
	$('#employee_first_name').val(localStorage.employee_first_name);
	$('#employee_id').val(localStorage.employee_id);
	$('#employee_position').val(localStorage.employee_position);
	$('#employee_location').val(localStorage.employee_location);
    $('#send_report_to').val(localStorage.sendReportTo);
	setPicture('employeeImage', localStorage.photoID);
	
	loadPartners();
}

/***********************************************************************************/
/* 						Add a new partner							*/
/***********************************************************************************/
function loadPartners(){
	
	$('#employee_frequent_partners li:gt(1)').remove();
	var partnersArray = [];
	if (localStorage.frequent_partners != '')
		partnersArray = (localStorage.frequent_partners).split(",");
	
	for (var i=0; i < partnersArray.length; i++) {
		var row = partnersArray[i];
		var newEntryRow = $('#partner_template').clone();
		newEntryRow.removeAttr('id');
		newEntryRow.removeAttr('style');	
		newEntryRow.data('entryId',i);
		newEntryRow.appendTo('#employee_frequent_partners');
		newEntryRow.find('.partner_entry').text(row);
		newEntryRow.find('.delete').bind('touchstart', function(e){
										 var clickedPartner = $(this).parent();
										 var clickedPartnerId = clickedPartner.data('entryId');
										 partnersArray.splice(clickedPartner, 1);
										 localStorage.frequent_partners = partnersArray.join(',');
										 clickedPartner.slideUp();
										 e.stopPropagation();
										 });
		newEntryRow.find('.unlock_line').bind('touchstart', function(e){
											  var clickedEntry = $(this).parent();
											  var clickedEntryId = clickedEntry.data('entryId');
											  delete_show_hide(this);
											  e.stopPropagation();
											  });	
	}
}

/***********************************************************************************/
/* 						Add a new partner							*/
/***********************************************************************************/
function addPartner(){
	//Start by clearing the list
	$('#employee_frequent_partners li:gt(1)').remove();
	
	var new_partner = "," + $('#partner_last_name').val() + " " + $('#partner_first_name').val();
	localStorage.frequent_partners += new_partner;
	
	jQT.goBack();
}

/***********************************************************************************/
/* 								Create new Patient from Code									*/
/***********************************************************************************/
function testConnection() {
	// Use phonegap to test if connection exists
	var networkState = navigator.network.connection.type;
	
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';
	
	if (networkState == Connection.NONE){
		alert(states[Connection.NONE]);
		jQT.goBack();
	}
}

function getBool(state){
	if (state == 'true')
		return true;
	else
		return false;
}

function oneTap_button(element){
	if (moved) return false;
	if (($(element).data('status') == 'negative')){
		$(element).prop('class', 'twoTap');
		$(element).data('status', 'positive');
	}
	else if ($(element).data('status') == 'positive'){
		$(element).prop('class', '');
		$(element).data('status', '');
	}
	else {
		$(element).prop('class', 'oneTap');
		$(element).data('status', 'negative');
	}
}

function oneTap_one_color_button(element){
	if (moved) return false;
	if (($(element).data('status') == 'negative')){
		$(element).prop('class', 'twoTap');
		$(element).data('status', 'positive');
	}
	else {
		$(element).prop('class', '');
		$(element).data('status', 'negative');
	}
}

function gi_outline_toggle(element){
	if (moved) return false;
	if (($(element).data('green') == false)){
		$(element).css("background", "green");
		$(element).data('green', true);
	}
	else {
		$(element).css("background", "white");
		$(element).data('green', false);
	}
}

function toggleSeat(element){
	if (moved) return false;
	if ($(element).prop("id") == "car_steering_wheel"){
		element = $('#car1');
	}
	$('#car_seats div').data('status', 'negative');
	$('#car_seats div').css('background', 'white');
	$('#motorcycle_seats div').data('status', 'negative');
	$('#motorcycle_seats div').css('background', 'white');
	$(element).data('status', 'positive');
	$(element).css("background", "green");
}

function colorChiefComplaintButtons(){
	setButtonColor($('#cc_diff_breathing'));
	setButtonColor($('#cc_chest_pain'));
	setButtonColor($('#cc_nausea'));
	setButtonColor($('#cc_vomiting'));
	setButtonColor($('#cc_diarrhea'));
	setButtonColor($('#cc_dizziness'));
	setButtonColor($('#cc_headache'));
	setButtonColor($('#cc_loc'));
	setButtonColor($('#cc_numb_tingling'));
	setButtonColor($('#cc_gal_weakness'));
	setButtonColor($('#cc_lethargy'));
	setButtonColor($('#cc_neck_pain'));
}

function colorECGButtons(){
	setButtonColor($('#ecg_i'));
	setButtonColor($('#ecg_avr'));
	setButtonColor($('#ecg_v1'));
	setButtonColor($('#ecg_v4'));
	setButtonColor($('#ecg_ii'));
	setButtonColor($('#ecg_avl'));
	setButtonColor($('#ecg_v2'));
	setButtonColor($('#ecg_v5'));
	setButtonColor($('#ecg_iii'));
	setButtonColor($('#ecg_avf'));
	setButtonColor($('#ecg_v3'));
	setButtonColor($('#ecg_v6'));
}

function setButtonColor(element){
	if ($(element).data('status') == 'positive'){
		$(element).prop('class', 'twoTap');
	}
	if ($(element).data('status') == 'negative'){
		$(element).prop('class', 'oneTap');
	}
	if (($(element).data('status') != 'negative') && ($(element).data('status') != 'positive')){
		$(element).prop('class', '');
	}
}

function abcToggle(link){
	$('#abcbar input[type="radio"]').prop("checked", "");
	if (link == 'a') {
		$('#airwayDiv').css("display","block");
		$('#breathingDiv').css("display","none");
		$('#circulationDiv').css("display","none");
		$('#airway_shortcut').prop("checked", "checked");
	}
	if (link == 'b') {
		$('#airwayDiv').css("display","none");
		$('#breathingDiv').css("display","block");
		$('#circulationDiv').css("display","none");
		$('#breathing_shortcut').prop("checked", "checked");
	}
	if (link == 'c') {
		$('#airwayDiv').css("display","none");
		$('#breathingDiv').css("display","none");
		$('#circulationDiv').css("display","block");
		$('#circulation_shortcut').prop("checked", "checked");
	}
	window.scrollTo(0,0);
}

function gi_guToggle(link){
	$('#gigubar input[type="radio"]').prop("checked", "");
	if (link == 'gi') {
		$('#giDiv').css("display","block");
		$('#guDiv').css("display","none");
		$('#ob_gynDiv').css("display","none");
		$('#gi_shortcut').prop("checked", "checked");
	}
	if (link == 'gu') {
		$('#giDiv').css("display","none");
		$('#guDiv').css("display","block");
		$('#ob_gynDiv').css("display","none");
		$('#gu_shortcut').prop("checked", "checked");
	}
	if (link == 'ob_gyn') {
		$('#giDiv').css("display","none");
		$('#guDiv').css("display","none");
		$('#ob_gynDiv').css("display","block");
		$('#ob_gyn_shortcut').prop("checked", "checked");
	}
	window.scrollTo(0,0);
}

function burnToggle(link){
	bodyType = link;
	// TODO Call for a reset and calculate %
	$('#burnbar input[type="radio"]').prop("checked", "");
	if (link == 'adult') {
		$('#burn_adult_shortcut').prop("checked", "checked");
	}
	if (link == 'obese') {
		$('#burn_obese_shortcut').prop("checked", "checked");
	}
	if (link == 'child') {
		$('#burn_child_shortcut').prop("checked", "checked");
	}
	if (link == 'infant') {
		$('#burn_infant_shortcut').prop("checked", "checked");
	}
	// Sets the surfaces
	changeSurfaces(link)
	// Calculate burn surface
	calculateBurnSurface();
}

function show_hide_intake(){
	if ($('#in_out_intake').prop("checked") == false){
		$('#intakeDiv').css("display", "block");
		$('#outtakeDiv').css("display", "none");
	}
	else{
		$('#intakeDiv').css("display", "none");
		$('#outtakeDiv').css("display", "block");
	}
}

function toggle_perrl(){
	if ($('#perrl').prop("checked") == true){
		$('#li_perrl').slideDown();
		$('#left_eye').prop("placeholder", "L");
	}
	else{
		$('#li_perrl').slideUp();
		$('#left_eye').prop("placeholder", "Size");
	}
}

function reflect_perrl(){
	if ($('#perrl').prop("checked") == false){
		$('#li_perrl').show();
		$('#left_eye').prop("placeholder", "L");
	}
	else{
		$('#li_perrl').hide();
		$('#left_eye').prop("placeholder", "Size");
	}
}

function toggleTrauma(){
	if ($('#is_trauma').prop('checked') == true){
		$('#traumaTypes li').hide();
		$('#li_is_trauma').show();
	}
	else{
		$('#traumaTypes li').show();
	}
	saveTrauma();
}

function toggleElement(elem){
	if (moved) return false;
	if ($(elem).css("display") == 'block'){
		$(elem).css("display", "none");
	}
	else{
		$(elem).css("display", "block");
	}
}

function delete_show_hide(elem){
	var line = $(elem).parent();
	var but = line.find('.delete');
	if (but.css("display") == 'block'){
		but.slideUp();
		$(elem).prop("src","images/img/disabled.png");
	}
	else{
		but.slideDown();
		$(elem).prop("src","images/img/disabled_unlock.png");
	}
}

function element_Show_Hide(elem1, strElem2){
	var elem2 = $(strElem2);
	if ($(elem1).prop("checked") == false){
		elem2.slideDown();
	}
	else{
		elem2.slideUp();
	}
}

function elements_Show_Hide(elem1, strElem2, strElem3){
	var elem2 = $(strElem2);
	var elem3 = $(strElem3);
	if ($(elem1).prop("checked") == false){
		elem3.hide();
		elem2.show();
	}
	else{
		elem2.hide();
		elem3.show();
	}
}

function reflectGCS(elem1, strElem2, strElem3){
	var elem2 = $(strElem2);
	var elem3 = $(strElem3);
	if ($(elem1).prop("checked") == true){
		elem3.hide();
		elem2.show();
	}
	else{
		elem2.hide();
		elem3.show();
	}
}

function indiv_Show_Hide(elem1, strElem2){
	var elem2 = $(strElem2);
	if ($(elem1).prop("checked") == false){
		elem2.show();
	}
	else{
		elem2.hide();
	}
}

function element_Show_Hide_Reverse(elem1, strElem2){
	var elem2 = $(strElem2);
	if ($(elem1).prop("checked") == true){
		elem2.slideDown();
	}
	else{
		elem2.slideUp();
	}
}

function reflectDB(strElem1, strElem2){
	var elem1 = $(strElem1);
	var elem2 = $(strElem2);
	if ($(elem1).prop("checked") == true){
		elem2.show();
	}
	else{
		elem2.hide();
	}
}

function reflectDBReverse(strElem1, strElem2){
	var elem1 = $(strElem1);
	var elem2 = $(strElem2);
	if ($(elem1).prop("checked") == false){
		elem2.show();
	}
	else{
		elem2.hide();
	}
}

function reflect_select(strElem1, optionVal, strElem2){
	var elem2 = $(strElem2);
	var str = strElem1 + ' option:selected';
	var value = $(str).val();
	if (value == optionVal){
		elem2.show();
	}
	else{
		elem2.hide();
	}
}

function select_show_hide(elem1, optionVal, strElem2){
	var elem2 = $(strElem2);
	var strElem1 = '#' + elem1.id + ' option:selected';
	var value = $(strElem1).val();
	if (value == optionVal){
		elem2.slideDown();
	}
	else{
		elem2.slideUp();
	}
}

function lungs_Show_Hide(){
	if ($('#ctax4').prop("checked") == true){
		$('#lungs_related').slideDown();
		$('#UR_Lung_Sound').val(0);
		$('#UL_Lung_Sound').val(0);
		$('#LR_Lung_Sound').val(0);
		$('#LL_Lung_Sound').val(0);
	}
	else{
		$('#lungs_related').slideUp();
		$('#UR_Lung_Sound').val(1);
		$('#UL_Lung_Sound').val(1);
		$('#LR_Lung_Sound').val(1);
		$('#LL_Lung_Sound').val(1);
	}
}

function reflect_lungs(){
	if ($('#ctax4').prop("checked") == false){
		$('#lungs_related').show();
	}
	else{
		$('#lungs_related').hide();
	}
}

function car_Motorcycle(){
	if ($('#car').prop("checked") == false){
		$('#motorcycle_outline').hide();
		$('.motorcycle_details').hide();
		$('#car_outline').show();
		$('.car_details').show();
		$('#li_driver_passenger').slideDown();
	}
	else{
		$('#car_outline').hide();
		$('.car_details').hide();
		$('#motorcycle_outline').show();
		$('.motorcycle_details').show();
		$('#li_driver_passenger').slideUp();		
	}
}

function reflectCarMoto(ptSeat){
	//cheat
	var old_state = $('#car').prop("checked");
	if (old_state == true)
		$('#car').prop("checked", false);
	else
		$('#car').prop("checked", true);
	car_Motorcycle();
	$('#car').prop("checked", old_state);
	var ptSeatString = "#" + ptSeat;
	toggleSeat($(ptSeatString));
}

function changeSurfaces(body){
	var head = ['4.5','1','8.5','10'];
	var chest = ['9','12.5','9','8'];
	var halfUpperLimb = ['2.25','1.25','2.25','2'];
	var halfLowerLimb = ['4.5','5','3.25','4'];
	var index;
	switch(body)
	{
	case 'adult':
	  index = 0;
	  break;
	case 'obese':
	  index = 1;
	  break;
	case 'child':
	  index = 2;
	  break;
	case 'infant':
	  index = 3;
	  break;
	default:
	}
	$('#burn_head_front').data('surface', head[index]);
	$('#burn_head_back').data('surface', head[index]);
	$('#burn_chest').data('surface', chest[index]);
	$('#burn_abdomen').data('surface', chest[index]);
	$('#burn_upper_back').data('surface', chest[index]);
	$('#burn_lower_back').data('surface', chest[index]);
	$('#burn_ulx_up_front').data('surface', halfUpperLimb[index]);
	$('#burn_ulx_low_front').data('surface', halfUpperLimb[index]);
	$('#burn_ulx_up_back').data('surface', halfUpperLimb[index]);
	$('#burn_ulx_low_back').data('surface', halfUpperLimb[index]);
	$('#burn_urx_up_front').data('surface', halfUpperLimb[index]);
	$('#burn_urx_low_front').data('surface', halfUpperLimb[index]);
	$('#burn_urx_up_back').data('surface', halfUpperLimb[index]);
	$('#burn_urx_low_back').data('surface', halfUpperLimb[index]);
	$('#burn_llx_up_front').data('surface', halfLowerLimb[index]);
	$('#burn_llx_low_front').data('surface', halfLowerLimb[index]);
	$('#burn_llx_up_back').data('surface', halfLowerLimb[index]);
	$('#burn_llx_low_back').data('surface', halfLowerLimb[index]);
	$('#burn_lrx_up_front').data('surface', halfLowerLimb[index]);
	$('#burn_lrx_low_front').data('surface', halfLowerLimb[index]);
	$('#burn_lrx_up_back').data('surface', halfLowerLimb[index]);
	$('#burn_lrx_low_back').data('surface', halfLowerLimb[index]);
}

function init_body_parts(){
	$('#burn_body_parts img').data('burn_degree', '0');
	$('#burn_body_parts img').data('surface', '');
}

function toggle_body_part(element, a, o, c, i){
	if (moved) return false;
	// The increase/decrease, depends on the bodyType
	var increase;
	if (bodyType == 'adult')
		increase = a;
	if (bodyType == 'obese')
		increase = o;
	if (bodyType == 'child')
		increase = c;
	if (bodyType == 'infant')
		increase = i;
	// The burn degree
	var burn_degree = $(element).data('burn_degree');
	// Source of the image
	var current_src = $(element).prop('src');
	// Goes from no burn to 1st degree
	if ($(element).data('burn_degree') == '0'){
		// Color the Burnt body part in red
		$(element).prop('src', current_src.slice(0, -5) + '1.png');
		// change the degree to 1
		$(element).data('burn_degree', '1');
		// chose the appropriate surface for this body part
		$(element).data('surface', increase);
	}
	// Goes from 1st to 2nd degree
	else if ($(element).data('burn_degree') == '1'){
		// Color the Burnt body part in red
		$(element).prop('src', current_src.slice(0, -5) + '2.png');
		// change the degree to 2
		$(element).data('burn_degree', '2');
		// chose the appropriate surface for this body part
		$(element).data('surface', increase);
	}
	else if ($(element).data('burn_degree') == '2'){
		// Color the Burnt body part in red
		$(element).prop('src', current_src.slice(0, -5) + '3.png');
		// change the degree to 3
		$(element).data('burn_degree', '3');
		// chose the appropriate surface for this body part
		$(element).data('surface', increase);
	}
	else if ($(element).data('burn_degree') == '3'){
		// reset body part to white
		$(element).prop('src', current_src.slice(0, -5) + '0.png');
		// Reset the degree to 0
		$(element).data('burn_degree', '0');
		// chose the appropriate surface for this body part
		$(element).data('surface', increase);
	}
	// Calculate the total percentage
	calculateBurnSurface();
}

function renderColors(element){
	var current_src = $(element).prop('src');
	current_src = current_src.slice(0, -5);
	var degree = $(element).data('burn_degree');
	$(element).prop('src', current_src + degree + '.png');
}


function calculateBurnSurface(){
	var total = 0;
	// Percentage Displayed on top of page
	var currentPercent = $('#total_burn_percentage').val();
	// Parse each img and add .data('surface')
	$('#burn_body_parts img').each(function(index){
		if ($(this).data('burn_degree') >= '2')
		total += parseFloat($(this).data('surface'));
	});
	$('#total_burn_percentage').val(total);
}

function calculateAge(){
	var dob = Date.parse($('#date_of_birth').val());
	var seconds = Math.floor((getSystemTime() - dob) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var years = Math.floor(days / 365.25);
	days = days - Math.floor(years * 365.25);
	$('#patientAge').html(years + " years " + days + " " + "d");
}

function calculateWeight(){
	var weight = $('#weight').val();
	var converted;
	var kg = $('#weight_unit').prop("checked");
	if (weight != ''){
		if (kg == false){
			converted = weight / 2.2;
			$('#weight').val(converted.toFixed(1));
		}
		else{
			converted = weight * 2.2;
			$('#weight').val(converted.toFixed(1));
		}
	}
}

function calculateMmol(){
	var volume_unit = $('#bgl').val();
	var converted;
	var mmol = $('#bgl_unit').prop("checked");
	if (volume_unit != ''){
		if (mmol == false){
			converted = volume_unit / 18;
			$('#bgl').val(converted.toFixed(1));
		}
		else{
			converted = volume_unit * 18;
			$('#bgl').val(converted.toFixed(1));
		}
	}
}

function calculateTemperature(){
	var temperature = $('#temp').val();
	var converted;
	var celsius = $('#temp_unit').prop("checked");
	if (temperature != ''){
		if (celsius == false){
			converted = (temperature - 32) * (5/9);
			$('#temp').val(converted.toFixed(1));
		}
		else{
			converted = (temperature * (9/5)) + 32;
			$('#temp').val(converted.toFixed(1));
		}
	}
}

function calculateSpeed(){
	var speed = $('#approx_speed').val();
	var converted;
	var kph = $('#speed_unit').prop("checked");
	if (speed != ''){
		if (kph == false){
			converted = speed * 1.609344;
			$('#approx_speed').val(converted.toFixed(1));
		}
		else{
			converted = speed / 1.609344;
			$('#approx_speed').val(converted.toFixed(1));
		}
	}
}

function calculateFallDistance(){
	var distance = $('#distance_fall').val();
	var converted;
	var meters = $('#distance_fall_unit').prop("checked");
	if (distance != ''){
		if (meters == false){
			converted = distance / 3.2808399;
			$('#distance_fall').val(converted.toFixed(1));
		}
		else{
			converted = distance * 3.2808399;
			$('#distance_fall').val(converted.toFixed(1));
		}
	}
}

function calculateTotalNeuro(){
	var total;
	var eyes = parseInt($('#eyes').val());
	var verbal = parseInt($('#verbal').val());
	var motor = parseInt($('#motor').val());
	total = eyes + verbal + motor;
	$('#total_neuro').text("Total: " + total);
}

function calculateTotalApgar(){
	var total;
	var appearance = parseInt($('#apgar_appearance').val());
	var pulse = parseInt($('#apgar_pulse_rate').val());
	var grimace = parseInt($('#apgar_grimace').val());
	var activity = parseInt($('#apgar_activity').val());
	var respiratory = parseInt($('#apgar_respiratory').val());
	total = appearance + pulse + grimace + activity + respiratory;
	$('#apgar_total').text("Total: " + total);
	return total;
}

function timedCount()
{
	var min = parseInt(cpr_counter/60);
	var sec = cpr_counter - (min * 60);
	$('#timer').text(min + " min " + sec + " sec");
	cpr_counter=cpr_counter+1;
	time=setTimeout("timedCount()",1000);
}

function doTimer()
{
	if (timer_is_on == false){
		timer_is_on=true;
		timedCount();
	}
}

function stopCount(){
	clearTimeout(time);
	timer_is_on=false;
	cpr_counter = 0;
	$('#timer').text("");
}

function getSystemTime(){
	var d = new Date();
	return d.getTime();
}

/***********************************************************************************/
/* 								Body Load									*/
/***********************************************************************************/
function onBodyLoad()
{		
    document.addEventListener("deviceready",onDeviceReady,false);
}

/***********************************************************************************/
/* 								Device Ready									*/
/***********************************************************************************/
function onDeviceReady() {
	//Camera
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	
	//printing
	/*window.plugins.printPlugin.isPrintingAvailable(
	function(result){
		alert(result.available ? "Printing is available on your Device" : "Printing is NOT available on your Device");
	}
	);*/
}

/***********************************************************************************/
/* 								Camera Management									*/
/***********************************************************************************/

function takePicture(source){
	//$('body').append('<div id="progress">Loading...</div>');
	currentPicture = source;
	navigator.camera.getPicture(onSuccess, onFail, { quality: 30, allowEdit: true,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 300,
								targetHeight: 300});
}

function onSuccess(imageData) {
    var pic = document.getElementById(currentPicture);
    pic.src = "data:image/png;base64," + imageData;
	pic.className = "picture";
	currentPicture = "";
	//$('#progress').remove();
}

function setPicture(myPicture, source){
	var pic = document.getElementById(myPicture);
	pic.src = source;
	if ((source == "") || (source == undefined) ){
		pic.className = "pictureHidden";
	}
	else
		pic.className = "picture";
}
var secondClick = false;
function removePicture(source){
	if (secondClick == true){
		secondClick = false;
		return false;
	}
	var answer = confirm("Do you really want to erase this picture?");
	if (answer){
		resetPicture(source);
	}
	secondClick = true;
}
function resetPicture(source){
	var pic = document.getElementById(source);
	pic.src="";
	pic.className = "pictureHidden";
}

function onFail(message) {
	//$('#progress').remove();
    alert('Failed because: ' + message);
}


/***********************************************************************************/
/* 								printing									*/
/***********************************************************************************/
function printIt(){
    
    //Get HTML string
    var html = document.getElementById("sum_content").innerHTML;
    /*
     Pass a DOM node (or HTML string) and - optionally - success function, error function, position of print dialog (iPad only).
     */
	
	
    window.plugins.printPlugin.print(html,
            function(result) {
                alert("Printing successful");
            }, 
            function(result) {
                if (!result.available){
                    alert("Printing is not available on your device");
				}
                else{
                    //Localised error description
                    //alert(result.error);
                }
            }
            /*
            Add the following on an iPad to position the dialog
									
            {dialogOffset: {left: 500, top: 900}}
            */
    );
}


/***********************************************************************************/
/* 								email									*/
/***********************************************************************************/
function doEmail() {
var prefix = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html>" +
    "<head>" +
    "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />" +
    "<title>ePCR report</title>" +
    "<style type='text/css'>" +
    "div#jqt > * {display: none;}" +
    "div #export_page {display: inline;}" +
    "div #export_page a{display: none;}" +
    "div #export_page h1{display: none;}" +
    "div #export_page p#header{font-size : 12px;}" +
    "div #export_page .logo{margin-right: 20px;}" +
    "div #export_page hr {border: 2px solid #000;margin-bottom: 10px;}" +
    "#vitals_sum table, #procedures_sum table:not(.singleEntry){text-align: center; color: black; border: 1px solid #000;}" +
    "div #export_page table .head {font: bold 14px Helvetica;}" +
    "div #export_page table .answer {font: bold 15px Helvetica;}" +
    "div #export_page table .question {font: normal 15px Helvetica;}" +
    "</style>" +
    "</head>" +
    "<body leftmargin='0' marginwidth='0' topmargin='0' marginheight='0' offset='0'>";
	var html = prefix + document.getElementById("sum_content").innerHTML + "</body></html>";
    window.plugins.emailComposer.showEmailComposer("ePCR report",html,localStorage.sendReportTo, "", "",true); 
}

/***********************************************************************************/
/* 						Fill the mobiscroll with a certain date/time				*/
/***********************************************************************************/
function setMobiscroll(t, elem) {
	//var d = new Date();
	//d.setTime(t);
	//$(elem).scroller('setValue', d, true);
}