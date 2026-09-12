/* URSafe - Mock Data & Indian States/Districts */

const IndianStates = {
    "Andhra Pradesh": ["Anantapur","Chittoor","East Godavari","Guntur","Krishna","Kurnool","Nellore","Prakasam","Srikakulam","Visakhapatnam","Vizianagaram","West Godavari","YSR Kadapa"],
    "Arunachal Pradesh": ["Itanagar","Tawang","West Kameng","East Kameng","Papum Pare","Lower Subansiri","Upper Subansiri","Changlang"],
    "Assam": ["Guwahati","Dibrugarh","Jorhat","Nagaon","Silchar","Tezpur","Tinsukia","Barpeta","Karimganj","Goalpara"],
    "Bihar": ["Patna","Gaya","Muzaffarpur","Bhagalpur","Darbhanga","Purnia","Arrah","Begusarai","Katihar","Munger","Samastipur"],
    "Chhattisgarh": ["Raipur","Bilaspur","Durg","Korba","Rajnandgaon","Jagdalpur","Ambikapur","Raigarh"],
    "Goa": ["North Goa","South Goa"],
    "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Junagadh","Gandhinagar","Kutch","Anand","Mehsana"],
    "Haryana": ["Gurugram","Faridabad","Panipat","Ambala","Karnal","Hisar","Rohtak","Sonipat","Panchkula","Yamunanagar"],
    "Himachal Pradesh": ["Shimla","Manali","Dharamshala","Mandi","Solan","Kullu","Bilaspur","Hamirpur"],
    "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar","Hazaribagh","Giridih","Dumka"],
    "Karnataka": ["Bengaluru","Mysuru","Mangaluru","Hubli-Dharwad","Belgaum","Gulbarga","Davanagere","Bellary","Shimoga","Tumkur"],
    "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Alappuzha","Palakkad","Kannur","Malappuram","Kottayam","Idukki","Wayanad","Pathanamthitta","Kasaragod"],
    "Madhya Pradesh": ["Bhopal","Indore","Jabalpur","Gwalior","Ujjain","Sagar","Dewas","Satna","Ratlam","Rewa"],
    "Maharashtra": ["Mumbai","Pune","Nagpur","Thane","Nashik","Aurangabad","Solapur","Kolhapur","Amravati","Navi Mumbai","Sangli","Ratnagiri"],
    "Manipur": ["Imphal East","Imphal West","Thoubal","Bishnupur","Churachandpur"],
    "Meghalaya": ["East Khasi Hills","West Khasi Hills","Ri-Bhoi","East Jaintia Hills","West Garo Hills"],
    "Mizoram": ["Aizawl","Lunglei","Champhai","Serchhip","Kolasib"],
    "Nagaland": ["Dimapur","Kohima","Mokokchung","Tuensang","Wokha"],
    "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri","Balasore","Bhadrak","Jharsuguda"],
    "Punjab": ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali","Pathankot","Hoshiarpur","Moga"],
    "Rajasthan": ["Jaipur","Jodhpur","Udaipur","Kota","Ajmer","Bikaner","Alwar","Bharatpur","Sikar","Bhilwara","Pali"],
    "Sikkim": ["Gangtok","Namchi","Gyalshing","Mangan","Soreng"],
    "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Erode","Vellore","Thoothukudi","Tiruppur","Dindigul","Thanjavur","Kancheepuram"],
    "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Mahbubnagar","Nalgonda","Adilabad","Medak","Rangareddy"],
    "Tripura": ["Agartala","Udaipur","Dharmanagar","Kailashahar","Belonia"],
    "Uttar Pradesh": ["Lucknow","Kanpur","Agra","Varanasi","Meerut","Allahabad","Ghaziabad","Noida","Bareilly","Aligarh","Moradabad","Gorakhpur","Mathura","Jhansi"],
    "Uttarakhand": ["Dehradun","Haridwar","Rishikesh","Nainital","Haldwani","Roorkee","Rudrapur","Kashipur"],
    "West Bengal": ["Kolkata","Howrah","Siliguri","Durgapur","Asansol","Bardhaman","Malda","Kharagpur","Haldia","Baharampur"],
    "Andaman and Nicobar Islands": ["Port Blair","Car Nicobar","Mayabunder","Diglipur","Rangat"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman","Diu","Silvassa"],
    "Delhi": ["New Delhi","North Delhi","South Delhi","East Delhi","West Delhi","Central Delhi","North East Delhi","North West Delhi","South East Delhi","South West Delhi","Shahdara"],
    "Jammu and Kashmir": ["Srinagar","Jammu","Anantnag","Baramulla","Udhampur","Kathua","Rajouri","Poonch"],
    "Ladakh": ["Leh","Kargil"],
    "Lakshadweep": ["Kavaratti","Agatti","Minicoy"],
    "Puducherry": ["Puducherry","Karaikal","Mahe","Yanam"]
};

const MockAlerts = [
    {
        id: 1, type: 'cyclone', severity: 'critical',
        title: 'Cyclone Michaung - Red Alert',
        location: 'Tamil Nadu, Andhra Pradesh Coast',
        time: '15 min ago',
        description: 'Severe cyclonic storm Michaung expected to make landfall near Chennai by tonight. Wind speeds of 90-100 kmph. All residents within 5km of coast advised to evacuate immediately.',
        actions: ['Evacuate Now', 'Share Alert'],
        isNew: true
    },
    {
        id: 2, type: 'flood', severity: 'critical',
        title: 'Flood Warning - Brahmaputra Basin',
        location: 'Assam - Dibrugarh, Jorhat, Nagaon',
        time: '32 min ago',
        description: 'Water level in Brahmaputra river has crossed danger mark at multiple points. Flash floods expected in low-lying areas of Dibrugarh and Jorhat districts.',
        actions: ['View Safe Zones', 'Alert Family'],
        isNew: true
    },
    {
        id: 3, type: 'earthquake', severity: 'warning',
        title: 'Earthquake Alert - Moderate Activity',
        location: 'Uttarakhand - Chamoli Region',
        time: '1 hour ago',
        description: 'A 4.5 magnitude tremor detected near Chamoli. No tsunami warning issued. Aftershocks possible in next 24 hours. Stay alert and keep emergency kits ready.',
        actions: ['Safety Tips', 'Check Family'],
        isNew: true
    },
    {
        id: 4, type: 'heatwave', severity: 'warning',
        title: 'Extreme Heatwave Warning',
        location: 'Rajasthan - Jaipur, Jodhpur, Bikaner',
        time: '2 hours ago',
        description: 'Temperature expected to reach 47°C. Heat stroke advisory in effect. Avoid outdoor activities between 11 AM - 4 PM. Keep hydrated.',
        actions: ['Health Tips', 'Share'],
        isNew: false
    },
    {
        id: 5, type: 'power', severity: 'watch',
        title: 'Scheduled Power Outage',
        location: 'Mumbai - Andheri, Goregaon, Malad',
        time: '3 hours ago',
        description: 'Planned power maintenance from 10 PM to 6 AM tonight. Backup generators recommended for critical equipment. Hospital areas exempt.',
        actions: ['Set Reminder', 'Alert Family'],
        isNew: false
    },
    {
        id: 6, type: 'internet', severity: 'advisory',
        title: 'Internet Service Disruption',
        location: 'Delhi NCR - Noida, Greater Noida',
        time: '4 hours ago',
        description: 'Fiber optic cable damage reported. Internet speeds may be affected for 12-18 hours. Mobile data networks operational. Use offline mode for essential communication.',
        actions: ['Go Offline', 'Details'],
        isNew: false
    },
    {
        id: 7, type: 'landslide', severity: 'warning',
        title: 'Landslide Risk - Heavy Rainfall',
        location: 'Himachal Pradesh - Shimla, Manali',
        time: '5 hours ago',
        description: 'Continuous rainfall has increased landslide risk along NH-5. Travelers advised to avoid hill routes. Multiple roads blocked near Kinnaur.',
        actions: ['Road Status', 'Share'],
        isNew: false
    },
    {
        id: 8, type: 'tsunami', severity: 'watch',
        title: 'Tsunami Watch - Indian Ocean',
        location: 'Andaman & Nicobar Islands',
        time: '6 hours ago',
        description: '6.2 magnitude earthquake detected in Sumatra region. Tsunami watch issued for Andaman & Nicobar coast. No immediate threat but stay vigilant.',
        actions: ['Monitor', 'Evacuation Routes'],
        isNew: false
    },
    {
        id: 9, type: 'industrial', severity: 'advisory',
        title: 'Chemical Leak - Industrial Zone',
        location: 'Gujarat - Vapi Industrial Area',
        time: '8 hours ago',
        description: 'Minor chemical leak reported at Vapi GIDC. Air quality monitoring underway. Residents within 2km radius advised to keep windows closed.',
        actions: ['Air Quality', 'Report'],
        isNew: false
    },
    {
        id: 10, type: 'coldwave', severity: 'advisory',
        title: 'Cold Wave Alert',
        location: 'Punjab, Haryana, Delhi',
        time: '12 hours ago',
        description: 'Cold wave conditions expected for next 3 days. Minimum temperature may drop to 2°C. Provide warm shelter for homeless. Avoid prolonged exposure.',
        actions: ['Shelter Locations', 'Donate'],
        isNew: false
    }
];

const MockFamilyMembers = [
    { id: 1, name: 'Priya Sharma', relation: 'Spouse', phone: '9876543210', status: 'safe', lastSeen: '2 min ago', lat: 28.6139, lng: 77.2090 },
    { id: 2, name: 'Aarav Sharma', relation: 'Child', phone: '9876543211', status: 'safe', lastSeen: '15 min ago', lat: 28.6100, lng: 77.2150 },
    { id: 3, name: 'Sunita Devi', relation: 'Parent', phone: '9876543212', status: 'unknown', lastSeen: '3 hours ago', lat: 28.6200, lng: 77.2000 },
    { id: 4, name: 'Rajesh Sharma', relation: 'Sibling', phone: '9876543213', status: 'safe', lastSeen: '30 min ago', lat: 28.6050, lng: 77.2200 },
];

const MockPets = [
    { id: 1, name: 'Bruno', type: 'Dog', breed: 'Labrador', collarId: 'URSF-PET-001', connected: false },
    { id: 2, name: 'Whiskers', type: 'Cat', breed: 'Persian', collarId: 'URSF-PET-002', connected: false },
];

const MockVolunteers = [
    { id: 1, name: 'Dr. Anita Desai', type: 'medical', distance: '0.8 km', rating: 4.9, skills: ['First Aid','Trauma Care','CPR'], verified: true, lastActive: '5 min ago', phone: '9988776655', available: true },
    { id: 2, name: 'Rahul Verma', type: 'rescue', distance: '1.2 km', rating: 4.7, skills: ['Swift Water Rescue','Rope Rescue','Search'], verified: true, lastActive: '12 min ago', phone: '9988776656', available: true },
    { id: 3, name: 'Meena Kumari', type: 'supplies', distance: '1.5 km', rating: 4.8, skills: ['Food Distribution','Medical Supplies','Logistics'], verified: true, lastActive: '20 min ago', phone: '9988776657', available: true },
    { id: 4, name: 'Vikram Singh', type: 'shelter', distance: '2.1 km', rating: 4.6, skills: ['Temporary Shelters','Camp Management'], verified: true, lastActive: '35 min ago', phone: '9988776658', available: true },
    { id: 5, name: 'Pooja Nair', type: 'medical', distance: '2.4 km', rating: 4.5, skills: ['Nursing','Pediatric Care','Wound Dressing'], verified: false, lastActive: '1 hour ago', phone: '9988776659', available: true },
    { id: 6, name: 'Amit Patel', type: 'transport', distance: '3.0 km', rating: 4.3, skills: ['Heavy Vehicle','Boat Operation','Navigation'], verified: true, lastActive: '2 hours ago', phone: '9988776660', available: false },
    { id: 7, name: 'Deepa Iyer', type: 'communication', distance: '3.5 km', rating: 4.8, skills: ['HAM Radio','Satellite Phone','Translation'], verified: true, lastActive: '45 min ago', phone: '9988776661', available: true },
    { id: 8, name: 'Sanjay Gupta', type: 'rescue', distance: '4.2 km', rating: 4.4, skills: ['Mountaineering','Disaster Response','First Aid'], verified: false, lastActive: '3 hours ago', phone: '9988776662', available: true },
];

const MockReliefTeams = [
    { id: 1, name: 'NDRF Team Alpha', fullName: 'National Disaster Response Force - Battalion 1', type: 'ndrf', status: 'deployed', location: 'Chennai Sector 4', personnel: 45, contact: '1078', description: 'Specializing in flood and cyclone response. Currently deployed for Cyclone Michaung relief operations.' },
    { id: 2, name: 'State DRF Unit 3', fullName: 'Tamil Nadu State Disaster Response Force', type: 'sdrf', status: 'standby', location: 'Base Camp - Kancheepuram', personnel: 30, contact: '108', description: 'State-level rapid response unit on standby for deployment in affected coastal districts.' },
    { id: 3, name: 'Indian Red Cross', fullName: 'Indian Red Cross Society - Chennai Chapter', type: 'redcross', status: 'active', location: 'Multiple Relief Camps', personnel: 120, contact: '011-23716441', description: 'Operating 8 relief camps across Chennai. Providing food, shelter, and medical aid to displaced families.' },
    { id: 4, name: 'Indian Army - Op Sahayata', fullName: 'Indian Army - Southern Command Rescue Operations', type: 'army', status: 'deployed', location: 'Flood-affected areas - Assam', personnel: 200, contact: '1800-11-4455', description: 'Deployed for Operation Sahayata. Conducting evacuation, rescue, and relief distribution in Brahmaputra flood zones.' },
    { id: 5, name: 'NDRF Team Bravo', fullName: 'National Disaster Response Force - Battalion 4', type: 'ndrf', status: 'en-route', location: 'Moving to Vizag', personnel: 40, contact: '1078', description: 'En route to Visakhapatnam coast for pre-positioning ahead of cyclone landfall.' },
];

const MockCommunityMessages = [
    { id: 1, user: 'Ramesh K.', role: 'citizen', time: '2 min ago', message: 'Heavy waterlogging on MG Road near Spencer Plaza. Avoid this route. Water level is knee-deep.', location: 'MG Road, Chennai', urgency: 'high', replies: 4, likes: 12 },
    { id: 2, user: 'Dr. Sridhar', role: 'volunteer', time: '8 min ago', message: 'Medical camp set up at Government Higher Secondary School, T. Nagar. Free medicines and first aid available 24/7.', location: 'T. Nagar, Chennai', urgency: 'normal', replies: 8, likes: 45 },
    { id: 3, user: 'Chennai Corp.', role: 'government', time: '15 min ago', message: 'All schools and colleges closed for next 2 days due to cyclone warning. Government offices to function with minimum staff.', location: 'Chennai Metropolitan Area', urgency: 'high', replies: 23, likes: 156 },
    { id: 4, user: 'Lakshmi S.', role: 'citizen', time: '22 min ago', message: 'Need drinking water supply at Velachery area. Our apartment complex of 200 families has been without water for 18 hours.', location: 'Velachery, Chennai', urgency: 'high', replies: 6, likes: 34 },
    { id: 5, user: 'NDRF Official', role: 'government', time: '30 min ago', message: 'Rescue operations ongoing in Mudichur area. 47 families evacuated so far. If you are stranded, call 1078 or press SOS in URSafe app.', location: 'Mudichur, Chennai', urgency: 'critical', replies: 15, likes: 89 },
    { id: 6, user: 'Anil Volunteer', role: 'volunteer', time: '45 min ago', message: 'Distributing food packets at Adyar bus stand. 500 packets available. Please come in an orderly manner. Priority for elderly and children.', location: 'Adyar, Chennai', urgency: 'normal', replies: 11, likes: 67 },
    { id: 7, user: 'Preethi M.', role: 'citizen', time: '1 hour ago', message: 'Electric pole fallen on 2nd Main Road, Anna Nagar. Very dangerous - live wires on the road. Please avoid the area.', location: 'Anna Nagar, Chennai', urgency: 'critical', replies: 9, likes: 78 },
    { id: 8, user: 'TN Fire Dept.', role: 'government', time: '1 hour ago', message: 'Fire and rescue teams deployed across all zones. Emergency numbers: 101 (Fire), 108 (Ambulance), 1078 (NDRF). Stay safe and stay indoors.', location: 'Tamil Nadu', urgency: 'normal', replies: 5, likes: 120 },
];

const MockOfflineMessages = [
    { id: 1, user: 'Nearby User', distance: '50m', time: '1 min ago', message: 'Road ahead is blocked. Take the left route via temple street.', signal: 'strong' },
    { id: 2, user: 'Mesh Node #4', distance: '200m', time: '5 min ago', message: 'Relief truck arriving at community hall in 30 minutes.', signal: 'medium' },
    { id: 3, user: 'Nearby User', distance: '120m', time: '12 min ago', message: 'Safe passage confirmed through park area. Water receding.', signal: 'strong' },
    { id: 4, user: 'Mesh Node #7', distance: '500m', time: '20 min ago', message: 'Medical help needed at blue apartment, 3rd floor. Elderly person needs oxygen.', signal: 'weak' },
];

const EmergencyNumbers = [
    { name: 'National Emergency', number: '112' },
    { name: 'NDRF Helpline', number: '1078' },
    { name: 'Ambulance', number: '108' },
    { name: 'Fire', number: '101' },
    { name: 'Police', number: '100' },
    { name: 'Women Helpline', number: '1091' },
    { name: 'Child Helpline', number: '1098' },
    { name: 'Disaster Management', number: '1070' },
];
