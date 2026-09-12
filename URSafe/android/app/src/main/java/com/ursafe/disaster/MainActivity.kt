package com.ursafe.disaster

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            URSafeTheme()
        }
    }
}

private val PrimaryColor = Color(0xFFFF6B35)
private val SecondaryColor = Color(0xFF004E89)
private val DangerColor = Color(0xFFE74C3C)
private val SuccessColor = Color(0xFF27AE60)
private val BgDark = Color(0xFF0f0f0f)
private val BgCard = Color(0xFF1a1a1a)
private val TextPrimary = Color(0xFFf5f5f5)
private val TextMuted = Color(0xFF888888)

@Composable
fun URSafeTheme(content: @Composable () -> Unit = {}) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = PrimaryColor,
            secondary = SecondaryColor,
            tertiary = DangerColor,
            background = BgDark,
            surface = BgCard
        )
    ) {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = BgDark
        ) {
            URSafeApp()
        }
    }
}

@Composable
fun URSafeApp() {
    val navController = rememberNavController()
    var isLoggedIn by remember { mutableStateOf(false) }
    var userRole by remember { mutableStateOf("citizen") }
    var userName by remember { mutableStateOf("") }
    var userState by remember { mutableStateOf("") }

    NavHost(
        navController = navController,
        startDestination = if (isLoggedIn) "home" else "login"
    ) {
        composable("login") {
            LoginScreen(
                onLoginSuccess = { role, name, state ->
                    userRole = role
                    userName = name
                    userState = state
                    isLoggedIn = true
                    navController.navigate("home") {
                        popUpTo("login") { inclusive = true }
                    }
                }
            )
        }

        composable("home") {
            if (userRole == "volunteer") {
                VolunteerHomeScreen(
                    userName = userName,
                    userState = userState,
                    onLogout = {
                        isLoggedIn = false
                        navController.navigate("login") {
                            popUpTo("home") { inclusive = true }
                        }
                    }
                )
            } else {
                CitizenHomeScreen(
                    userName = userName,
                    userState = userState,
                    onLogout = {
                        isLoggedIn = false
                        navController.navigate("login") {
                            popUpTo("home") { inclusive = true }
                        }
                    }
                )
            }
        }
    }
}

@Composable
fun LoginScreen(
    onLoginSuccess: (String, String, String) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var role by remember { mutableStateOf("citizen") }
    var state by remember { mutableStateOf("Tamil Nadu") }
    var district by remember { mutableStateOf("Chennai") }

    val indianStates = listOf(
        "Tamil Nadu", "Andhra Pradesh", "Telangana", "Karnataka", "Maharashtra",
        "Gujarat", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Punjab",
        "Haryana", "Himachal Pradesh", "Uttarakhand", "Assam", "Bihar"
    )

    val districts = mapOf(
        "Tamil Nadu" to listOf("Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"),
        "Andhra Pradesh" to listOf("Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"),
        "Telangana" to listOf("Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"),
        "Karnataka" to listOf("Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belgaum"),
        "Maharashtra" to listOf("Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad")
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgDark)
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            "🛡️",
            fontSize = 48.sp,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Text(
            "UR",
            fontSize = 32.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary
        )
        Text(
            "Safe",
            fontSize = 32.sp,
            fontWeight = FontWeight.Bold,
            color = PrimaryColor,
            modifier = Modifier.offset(y = (-12).dp)
        )

        Text(
            "Disaster Safety & Community Response",
            fontSize = 12.sp,
            color = TextMuted,
            modifier = Modifier.padding(bottom = 32.dp)
        )

        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Your Name", color = TextMuted) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = TextPrimary,
                unfocusedTextColor = TextPrimary,
                focusedBorderColor = PrimaryColor,
                unfocusedBorderColor = Color.Gray
            )
        )

        var roleExpanded by remember { mutableStateOf(false) }
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp)
        ) {
            ExposedDropdownMenuBox(
                expanded = roleExpanded,
                onExpandedChange = { roleExpanded = !roleExpanded }
            ) {
                OutlinedTextField(
                    value = role,
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("Role", color = TextMuted) },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = roleExpanded) },
                    modifier = Modifier
                        .menuAnchor()
                        .fillMaxWidth(),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedTextColor = TextPrimary,
                        unfocusedTextColor = TextPrimary,
                        focusedBorderColor = PrimaryColor,
                        unfocusedBorderColor = Color.Gray
                    )
                )

                ExposedDropdownMenu(
                    expanded = roleExpanded,
                    onDismissRequest = { roleExpanded = false },
                    modifier = Modifier.background(BgCard)
                ) {
                    listOf("citizen", "volunteer", "government").forEach { option ->
                        DropdownMenuItem(
                            text = { Text(option.replaceFirstChar { it.uppercase() }, color = TextPrimary) },
                            onClick = {
                                role = option
                                roleExpanded = false
                            }
                        )
                    }
                }
            }
        }

        var stateExpanded by remember { mutableStateOf(false) }
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp)
        ) {
            ExposedDropdownMenuBox(
                expanded = stateExpanded,
                onExpandedChange = { stateExpanded = !stateExpanded }
            ) {
                OutlinedTextField(
                    value = state,
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("State", color = TextMuted) },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = stateExpanded) },
                    modifier = Modifier
                        .menuAnchor()
                        .fillMaxWidth(),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedTextColor = TextPrimary,
                        unfocusedTextColor = TextPrimary,
                        focusedBorderColor = PrimaryColor,
                        unfocusedBorderColor = Color.Gray
                    )
                )

                ExposedDropdownMenu(
                    expanded = stateExpanded,
                    onDismissRequest = { stateExpanded = false },
                    modifier = Modifier.background(BgCard)
                ) {
                    indianStates.forEach { option ->
                        DropdownMenuItem(
                            text = { Text(option, color = TextPrimary) },
                            onClick = {
                                state = option
                                district = districts[option]?.firstOrNull() ?: ""
                                stateExpanded = false
                            }
                        )
                    }
                }
            }
        }

        var districtExpanded by remember { mutableStateOf(false) }
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 24.dp)
        ) {
            ExposedDropdownMenuBox(
                expanded = districtExpanded,
                onExpandedChange = { districtExpanded = !districtExpanded }
            ) {
                OutlinedTextField(
                    value = district,
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("District", color = TextMuted) },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = districtExpanded) },
                    modifier = Modifier
                        .menuAnchor()
                        .fillMaxWidth(),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedTextColor = TextPrimary,
                        unfocusedTextColor = TextPrimary,
                        focusedBorderColor = PrimaryColor,
                        unfocusedBorderColor = Color.Gray
                    )
                )

                ExposedDropdownMenu(
                    expanded = districtExpanded,
                    onDismissRequest = { districtExpanded = false },
                    modifier = Modifier.background(BgCard)
                ) {
                    (districts[state] ?: emptyList()).forEach { option ->
                        DropdownMenuItem(
                            text = { Text(option, color = TextPrimary) },
                            onClick = {
                                district = option
                                districtExpanded = false
                            }
                        )
                    }
                }
            }
        }

        Button(
            onClick = {
                if (name.isNotEmpty()) {
                    onLoginSuccess(role, name, state)
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = PrimaryColor
            ),
            shape = RoundedCornerShape(8.dp)
        ) {
            Text("GET STARTED", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        }
    }
}

@Composable
fun CitizenHomeScreen(
    userName: String,
    userState: String,
    onLogout: () -> Unit
) {
    var selectedTab by remember { mutableStateOf(0) }

    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = BgCard,
                tonalElevation = 0.dp,
                modifier = Modifier.height(64.dp)
            ) {
                val tabs = listOf("🚨 Alerts", "👨‍👩‍👧 Family", "🤝 Help", "💬 Messages", "👤 Profile")
                tabs.forEachIndexed { index, title ->
                    NavigationBarItem(
                        icon = { Text(title.first().toString(), fontSize = 20.sp) },
                        label = { Text(title.drop(2).takeWhile { it != ' ' }, fontSize = 10.sp) },
                        selected = selectedTab == index,
                        onClick = { selectedTab = index },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PrimaryColor,
                            selectedTextColor = PrimaryColor,
                            unselectedIconColor = TextMuted,
                            unselectedTextColor = TextMuted,
                            indicatorColor = Color.Transparent
                        )
                    )
                }
            }
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(BgDark)
                .padding(paddingValues)
        ) {
            when (selectedTab) {
                0 -> AlertsTab(userState)
                1 -> FamilyTab()
                2 -> HelpTab()
                3 -> MessagesTab()
                4 -> ProfileTab(userName, userState, onLogout)
            }
        }
    }
}

@Composable
fun VolunteerHomeScreen(
    userName: String,
    userState: String,
    onLogout: () -> Unit
) {
    var selectedTab by remember { mutableStateOf(0) }

    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = BgCard,
                tonalElevation = 0.dp,
                modifier = Modifier.height(64.dp)
            ) {
                val tabs = listOf("🏕️ Camp", "📨 Requests", "💬 Messages", "👤 Profile")
                tabs.forEachIndexed { index, title ->
                    NavigationBarItem(
                        icon = { Text(title.first().toString(), fontSize = 20.sp) },
                        label = { Text(title.drop(2).takeWhile { it != ' ' }, fontSize = 10.sp) },
                        selected = selectedTab == index,
                        onClick = { selectedTab = index },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PrimaryColor,
                            selectedTextColor = PrimaryColor,
                            unselectedIconColor = TextMuted,
                            unselectedTextColor = TextMuted,
                            indicatorColor = Color.Transparent
                        )
                    )
                }
            }
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(BgDark)
                .padding(paddingValues)
        ) {
            when (selectedTab) {
                0 -> CampSetupTab()
                1 -> CitizenRequestsTab()
                2 -> MessagesTab()
                3 -> ProfileTab(userName, userState, onLogout)
            }
        }
    }
}

@Composable
fun AlertsTab(userState: String) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            "🚨 Alerts Near You",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            color = Color(0xFF2a2a2a),
            shape = RoundedCornerShape(8.dp)
        ) {
            Text(
                "📍 $userState",
                fontSize = 12.sp,
                color = PrimaryColor,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(8.dp)
            )
        }

        val alerts = listOf(
            Triple("Cyclone Michaung Warning", "Severe cyclonic storm approaching. Landfall expected tonight.", DangerColor),
            Triple("Flash Flood Alert", "Brahmaputra water level critical. Evacuation in progress.", DangerColor),
            Triple("Earthquake Activity", "Magnitude 4.2 tremor detected. Aftershocks likely.", Color(0xFFFF9100)),
        )

        alerts.forEach { (title, desc, color) ->
            AlertCard(title, desc, color)
        }
    }
}

@Composable
fun AlertCard(title: String, desc: String, color: Color) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 12.dp),
        colors = CardDefaults.cardColors(containerColor = BgCard),
        border = androidx.compose.material3.CardDefaults.outlinedCardBorder(
            enabled = true
        ).copy(
            border = BorderStroke(1.dp, Color.Gray)
        )
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(
                title,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = TextPrimary
            )
            Text(
                desc,
                fontSize = 12.sp,
                color = TextMuted,
                modifier = Modifier.padding(top = 6.dp)
            )
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 10.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Button(
                    onClick = {},
                    modifier = Modifier
                        .height(32.dp)
                        .weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryColor),
                    contentPadding = PaddingValues(4.dp)
                ) {
                    Text("Alert Family", fontSize = 11.sp)
                }
                Button(
                    onClick = {},
                    modifier = Modifier
                        .height(32.dp)
                        .weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                    border = BorderStroke(1px, PrimaryColor),
                    contentPadding = PaddingValues(4.dp)
                ) {
                    Text("Details", fontSize = 11.sp, color = PrimaryColor)
                }
            }
        }
    }
}

@Composable
fun FamilyTab() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            "👨‍👩‍👧 Family Link",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(bottom = 32.dp, top = 16.dp)
        )

        Button(
            onClick = {},
            modifier = Modifier
                .size(120.dp),
            colors = ButtonDefaults.buttonColors(containerColor = DangerColor),
            shape = RoundedCornerShape(50.dp)
        ) {
            Text("SOS", fontSize = 28.sp, fontWeight = FontWeight.Bold, color = Color.White)
        }

        Text(
            "Hold for 3 seconds",
            fontSize = 12.sp,
            color = TextMuted,
            modifier = Modifier.padding(top = 16.dp)
        )

        Text(
            "Family Members",
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier
                .align(Alignment.Start)
                .padding(top = 32.dp, bottom = 12.dp)
        )

        Text(
            "Add family members to notify them in emergencies",
            fontSize = 12.sp,
            color = TextMuted,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )

        Button(
            onClick = {},
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 20.dp),
            colors = ButtonDefaults.buttonColors(containerColor = SecondaryColor),
            shape = RoundedCornerShape(8.dp)
        ) {
            Text("➕ Add Member", fontSize = 14.sp, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun HelpTab() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            "🤝 Nearby Help",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(bottom = 16.dp, top = 8.dp)
        )

        val helpers = listOf(
            "Dr. Anita" to "Medical",
            "Rahul" to "Rescue",
            "Meena" to "Supplies"
        )

        helpers.forEach { (name, type) ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp),
                colors = CardDefaults.cardColors(containerColor = BgCard)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            name,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = TextPrimary
                        )
                        Text(
                            type,
                            fontSize = 12.sp,
                            color = TextMuted
                        )
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        Button(
                            onClick = {},
                            modifier = Modifier
                                .height(32.dp)
                                .padding(0.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = SuccessColor),
                            contentPadding = PaddingValues(8.dp)
                        ) {
                            Text("📞", fontSize = 12.sp)
                        }
                        Button(
                            onClick = {},
                            modifier = Modifier
                                .height(32.dp)
                                .padding(0.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = SecondaryColor),
                            contentPadding = PaddingValues(8.dp)
                        ) {
                            Text("💬", fontSize = 12.sp)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun MessagesTab() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            "💬 Messages",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(bottom = 16.dp, top = 8.dp)
        )

        val messages = listOf(
            "Ramesh K." to "Water logging near MG Road. Need rescue boats!",
            "Dr. Sridhar" to "Medical camp at Government School. Free treatment available.",
            "NDRF Official" to "Evacuation underway. Call 1078 if stranded.",
        )

        messages.forEach { (user, msg) ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp),
                colors = CardDefaults.cardColors(containerColor = BgCard)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(
                        user,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = TextPrimary
                    )
                    Text(
                        msg,
                        fontSize = 12.sp,
                        color = TextMuted,
                        modifier = Modifier.padding(top = 6.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun CampSetupTab() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            "🏕️ Setup Your Relief Camp",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(bottom = 16.dp, top = 8.dp)
        )

        var campName by remember { mutableStateOf("") }
        var location by remember { mutableStateOf("") }
        var capacity by remember { mutableStateOf("") }
        var services by remember { mutableStateOf("") }

        OutlinedTextField(
            value = campName,
            onValueChange = { campName = it },
            label = { Text("Camp Name", color = TextMuted) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = TextPrimary,
                unfocusedTextColor = TextPrimary,
                focusedBorderColor = PrimaryColor,
                unfocusedBorderColor = Color.Gray
            )
        )

        OutlinedTextField(
            value = location,
            onValueChange = { location = it },
            label = { Text("Location", color = TextMuted) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = TextPrimary,
                unfocusedTextColor = TextPrimary,
                focusedBorderColor = PrimaryColor,
                unfocusedBorderColor = Color.Gray
            )
        )

        OutlinedTextField(
            value = capacity,
            onValueChange = { capacity = it },
            label = { Text("Capacity", color = TextMuted) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = TextPrimary,
                unfocusedTextColor = TextPrimary,
                focusedBorderColor = PrimaryColor,
                unfocusedBorderColor = Color.Gray
            )
        )

        OutlinedTextField(
            value = services,
            onValueChange = { services = it },
            label = { Text("Services Available", color = TextMuted) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 24.dp)
                .heightIn(min = 100.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = TextPrimary,
                unfocusedTextColor = TextPrimary,
                focusedBorderColor = PrimaryColor,
                unfocusedBorderColor = Color.Gray
            )
        )

        Button(
            onClick = {},
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            colors = ButtonDefaults.buttonColors(containerColor = PrimaryColor),
            shape = RoundedCornerShape(8.dp)
        ) {
            Text("Save Camp Info", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        }
    }
}

@Composable
fun CitizenRequestsTab() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            "📨 Citizen Requests (3)",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(bottom = 16.dp, top = 8.dp)
        )

        val requests = listOf(
            "Ramesh K." to "Need medical supplies urgently. Blood pressure medicine.",
            "Priya S." to "Looking for safe shelter. Family of 4 displaced.",
            "Arun D." to "Food and water needed. Stranded at home.",
        )

        requests.forEach { (user, msg) ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF2a1515)),
                border = BorderStroke(2.dp, DangerColor)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 8.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            "🔴 URGENT",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = DangerColor
                        )
                    }
                    Text(
                        user,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = TextPrimary
                    )
                    Text(
                        msg,
                        fontSize = 12.sp,
                        color = TextMuted,
                        modifier = Modifier.padding(top = 6.dp)
                    )
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 10.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(
                            onClick = {},
                            modifier = Modifier
                                .height(32.dp)
                                .weight(1f),
                            colors = ButtonDefaults.buttonColors(containerColor = SuccessColor),
                            contentPadding = PaddingValues(4.dp)
                        ) {
                            Text("Respond", fontSize = 11.sp)
                        }
                        Button(
                            onClick = {},
                            modifier = Modifier
                                .height(32.dp)
                                .weight(1f),
                            colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                            border = BorderStroke(1.dp, TextMuted),
                            contentPadding = PaddingValues(4.dp)
                        ) {
                            Text("Mark Seen", fontSize = 11.sp, color = TextMuted)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ProfileTab(name: String, state: String, onLogout: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Box(
            modifier = Modifier
                .size(72.dp)
                .background(PrimaryColor, RoundedCornerShape(50.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text(
                name.first().toString(),
                fontSize = 32.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
        }

        Text(
            name,
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = TextPrimary,
            modifier = Modifier.padding(top = 16.dp)
        )

        Text(
            state,
            fontSize = 12.sp,
            color = TextMuted,
            modifier = Modifier.padding(top = 4.dp)
        )

        Button(
            onClick = onLogout,
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp)
                .padding(top = 32.dp),
            colors = ButtonDefaults.buttonColors(containerColor = DangerColor),
            shape = RoundedCornerShape(8.dp)
        ) {
            Text("Sign Out", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        }
    }
}

val BorderStroke.Companion.Companion
    get() = 1
val 1.px: Dp
    get() = 1.dp
